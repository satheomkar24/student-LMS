import { showError, type ICourse } from "@satheomkar24/common-types";
import { Button } from "reactstrap";
import {
  orderService,
  type RazorpaySuccessResponse,
} from "../../services/orderService";
import toast from "react-hot-toast";

type Props = {
  course: ICourse;
};
const CourseDetails = ({ course }: Props) => {
  const payForCourse = async (courseId: string) => {
    try {
      const data = await orderService.createOrder(courseId);
      console.log("📢[CourseDetails.tsx:12]: data: ", data);
      const { orderId, amount, currency, key } = data;

      const options = {
        key, // Razorpay Key ID
        amount,
        currency,
        order_id: orderId,
        name: "COURSE LMS",
        description: "Course Payment",
        theme: {
          color: "#3399cc",
        },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            await orderService.verifyOrder(response);
            toast.success("Payment Successful 🎉");
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Payment failed. Amount will be refunded if debited.");
          }
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", async () => {
        try {
          await orderService.cancelOrder(orderId);
        } catch (error) {
          console.log("📢[CourseDetails.tsx:48]: error: ", error);
        } finally {
          toast.error("Payment Failed");
        }
      });

      rzp.on("modal.closed", async () => {
        try {
          await orderService.cancelOrder(orderId);
        } catch (error) {
          console.log("📢[CourseDetails.tsx:53]: error: ", error);
        } finally {
          toast.error("Payment flow closed by user.");
        }
      });

      rzp.open();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showError(err, "Payment flow failed. Try again!");
    }
  };

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.summery}</p>
      <img src={course.image} alt={course.name} width={300} />
      <p>Price: ₹{course.price}</p>
      <Button onClick={() => payForCourse(course._id)}>Buy now</Button>
    </div>
  );
};

export default CourseDetails;
