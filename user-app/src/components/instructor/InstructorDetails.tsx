import { Col, Row } from "reactstrap";
import {
  FiAnchor,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiVideo,
  FiTwitter,
  FiUsers,
  FiStar,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import type { IInstructor } from "@satheomkar24/common-types";
import CourseCard from "../course/CourseCard";

type Props = {
  instructor: IInstructor;
};

const InstructorDetails = ({ instructor }: Props) => {
  return (
    <section>
      <Row>
        <Col md={3} lg={4}>
          <div className="d-flex flex-column  align-items-center">
            <img
              src={instructor.image || "/images/avtar.png"}
              style={{
                width: "min(300px, 100%)",
                aspectRatio: "1/1",
              }}
              alt="Instructor"
              className="rounded-circle bg-warning object-fit-cover"
            />
            <div className="d-flex gap-2 flex-wrap my-3">
              <a
                href={instructor.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="ins-icon socialLink"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href={instructor.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="ins-icon socialLink"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href={instructor.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="ins-icon socialLink"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href={instructor.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="ins-icon socialLink"
              >
                <FiTwitter size={24} />
              </a>
            </div>
          </div>
        </Col>
        <Col md={9} lg={8}>
          <h4 className="primary-orange">Instructor</h4>
          <h2 className="text-primary my-3 fw-bolder">{instructor.name}</h2>
          <p>{instructor.profession}</p>

          <Row className="g-3 mb-3">
            <Col sm={4}>
              <FiAnchor /> {instructor.profession}
            </Col>
            <Col sm={4}>
              <FiVideo /> {instructor.courseCount} Courses
            </Col>
          </Row>
          <Row className="g-3 mb-4">
            <Col sm={4}>
              <FiStar color="orange" /> {instructor.rating}
            </Col>
            <Col sm={4}>
              <FiUsers /> {instructor.totalStudents} Students
            </Col>
          </Row>
          <hr />
          <div className="my-4">
            <p className="fs-3 fw-bold">Bio</p>
            <p>{instructor.about}</p>
          </div>
          <div className="my-4">
            <p className="fs-3 fw-bold">Contact</p>
            <div className="d-flex gap-3 align-items-center mb-3">
              <a
                href={`tel:${instructor?.contactDetails?.mobile}`}
                target="_blank"
                rel="noreferrer"
                className="ins-icon"
              >
                <FiPhone size={24} />
              </a>
              <p className="mb-0">{instructor?.contactDetails?.mobile}</p>
            </div>
            <div className="d-flex gap-3 align-items-center mb-3">
              <a
                href={`mailto:${instructor?.contactDetails?.email}`}
                target="_blank"
                rel="noreferrer"
                className="ins-icon"
              >
                <FiMail size={24} />
              </a>
              <p className="mb-0">{instructor?.contactDetails?.email}</p>
            </div>
            <div className="d-flex gap-3 align-items-center mb-3">
              <span className="ins-icon">
                <FiMapPin size={24} />
              </span>
              <p className="mb-0">{instructor?.contactDetails?.address}</p>
            </div>
          </div>
        </Col>
      </Row>
      {instructor?.courses?.length > 0 && (
        <>
          <hr />
          <h3 className="primary-orange fw-bolder text-center mb-4">
            My Courses
          </h3>
          <Row className="g-3">
            {instructor.courses.map((course, index) => (
              <Col md={6} lg={4} xxl={3} key={index}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </section>
  );
};

export default InstructorDetails;
