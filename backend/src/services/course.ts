import { ORDER_STATUS } from "@enums/index";
import { ErrorRes } from "@middlewares/error";
import { Course } from "@models/course";
import { FAQ } from "@models/faq";
import { Instructor } from "@models/instructor";
import { Lesson } from "@models/lesson";
import { Order } from "@models/order";
import type {
  IGenericResponse,
  ICourse,
  ICoursePayload,
} from "@satheomkar24/common-types";
import { Assert } from "@utils/assert";
import { logger } from "@utils/logger";
import { toObjectId } from "@utils/objectId";
import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";

export class CourseService {
  static async getAll(): Promise<ICourse[]> {
    return Course.find()
      .select("-lessons -faqs -instructor -rating")
      .lean() as unknown as ICourse[];
  }

  static async getById(id: string): Promise<ICourse> {
    const course = await Course.findById(id)
      .populate("lessons")
      .populate("faqs")
      .populate("instructor")
      .populate("rating")
      .lean();
    Assert.entityFound(course, "Course");
    return course as unknown as ICourse;
  }

  static async getPreviewCourse(courseId: string) {
    return Course.findOne({
      _id: courseId,
      // publish: true,
    })
      .select(
        "name image summery price level category lessons faqs instructor rating",
      )
      .populate({
        path: "lessons",
        select: "name duration",
      })
      .populate("faqs")
      .populate({
        path: "instructor",
        select: "name profession image",
      })
      .populate("rating")
      .lean();
  }

  static async getFullCourse(courseId: string) {
    return Course.findOne({
      _id: courseId,
      publish: true,
    })
      .populate("lessons") // includes video
      .populate("faqs")
      .populate("instructor")
      .populate("rating")
      .lean();
  }

  static async create(payload: ICoursePayload): Promise<IGenericResponse> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      //  Create course (without refs)
      const course = await Course.create(
        [
          {
            name: payload.name,
            image: payload.image,
            summery: payload.summery,
            details: payload.details,
            price: payload.price,
            level: payload.level,
            category: payload.category,
            publish: payload.publish ?? false,
            ...(payload.instructor && {
              instructor: toObjectId(payload.instructor),
            }),
          },
        ],
        { session },
      );

      const courseDoc = course[0];
      Assert.entityFound(courseDoc, "Course");

      // Lessons
      if (payload.lessons?.length) {
        const lessons = await Lesson.insertMany(payload.lessons, { session });

        courseDoc.lessons = lessons.map((l) => l._id);
      }

      // FAQs
      if (payload.faqs?.length) {
        const faqs = await FAQ.insertMany(payload.faqs, { session });

        courseDoc.faqs = faqs.map((f) => f._id);
      }

      // Instructor side-effect
      if (payload.instructor) {
        const instructor = await Instructor.findById(
          payload.instructor,
        ).session(session);

        Assert.entityFound(instructor, "Instructor");

        instructor.courses.push(courseDoc._id);
        instructor.courseCount += 1;

        await instructor.save({ session });
      }

      await courseDoc.save({ session });

      await session.commitTransaction();
      return {
        message: "Course created successfully",
      };
    } catch (err) {
      await session.abortTransaction();
      logger.error("Course creation failed:", err);
      throw new ErrorRes("Failed to create course", StatusCodes.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }

  static async update(
    id: string,
    payload: ICoursePayload,
  ): Promise<IGenericResponse> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const course = await Course.findById(id).session(session);
      Assert.entityFound(course, "Course");

      const prevInstructorId = course.instructor?.toString();

      if (payload.instructor && payload.instructor !== prevInstructorId) {
        // remove from old instructor
        if (prevInstructorId) {
          await Instructor.findByIdAndUpdate(
            prevInstructorId,
            {
              $pull: { courses: course._id },
              $inc: { courseCount: -1 },
            },
            { session },
          );
        }

        // add to new instructor
        await Instructor.findByIdAndUpdate(
          payload.instructor,
          {
            $addToSet: { courses: course._id },
            $inc: { courseCount: 1 },
          },
          { session },
        );

        course.instructor = new Types.ObjectId(payload.instructor);
      }

      if (course.lessons.length) {
        await Lesson.deleteMany({ _id: { $in: course.lessons } }, { session });
      }

      if (course.faqs.length) {
        await FAQ.deleteMany({ _id: { $in: course.faqs } }, { session });
      }

      let lessonIds: Types.ObjectId[] = [];
      let faqIds: Types.ObjectId[] = [];

      if (payload.lessons?.length) {
        const lessons = await Lesson.insertMany(
          payload.lessons.map(({ name, video, duration }) => ({
            name,
            video,
            duration,
          })),
          { session },
        );
        lessonIds = lessons.map((l) => l._id);
      }

      if (payload.faqs?.length) {
        const faqs = await FAQ.insertMany(
          payload.faqs.map(({ answer, question }) => ({
            answer,
            question,
          })),
          { session },
        );
        faqIds = faqs.map((f) => f._id);
      }

      course.name = payload.name;
      course.image = payload.image;
      course.summery = payload.summery;
      course.details = payload.details;
      course.price = payload.price;
      course.level = payload.level;
      course.category = payload.category;
      course.publish = payload.publish;
      course.lessons = lessonIds;
      course.faqs = faqIds;

      await course.save({ session });

      await session.commitTransaction();
      return { message: "Course updated successfully" };
    } catch (err) {
      await session.abortTransaction();
      logger.error("Course update failed:", err);
      throw new ErrorRes("Failed to update course", StatusCodes.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }

  static async delete(id: string): Promise<IGenericResponse> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await Course.findById(id).session(session);
      Assert.entityFound(course, "Course");

      // Check paid orders
      const paidOrderExists = await Order.exists({
        course: course._id,
        status: ORDER_STATUS.PAID,
      });

      if (paidOrderExists) {
        throw new ErrorRes(
          "Cannot delete course with paid orders",
          StatusCodes.BAD_REQUEST,
        );
      }

      // Delete lessons
      if (course.lessons.length) {
        await Lesson.deleteMany({ _id: { $in: course.lessons } }, { session });
      }

      // Delete FAQs
      if (course.faqs.length) {
        await FAQ.deleteMany({ _id: { $in: course.faqs } }, { session });
      }

      // Update instructor
      if (course.instructor) {
        await Instructor.updateOne(
          { _id: course.instructor },
          {
            $pull: { courses: course._id },
            $inc: { courseCount: -1 },
          },
          { session },
        );
      }

      //  Delete course
      await Course.deleteOne({ _id: course._id }, { session });

      await session.commitTransaction();

      return { message: "Course deleted successfully" };
    } catch (err) {
      await session.abortTransaction();
      logger.error("Course delete failed:", err);
      throw err;
    } finally {
      session.endSession();
    }
  }
}
