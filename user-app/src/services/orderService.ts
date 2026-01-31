import { apiService } from "./apiService";

export type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type ICreateOrderRes = {
  orderId: string;
  amount: string | number;
  currency: string;
  key: string;
};

class OrderService {
  private base = "/orders";
  async createOrder(courseId: string) {
    return apiService.post<ICreateOrderRes>(`${this.base}/${courseId}/pay`);
  }
  async verifyOrder(data: RazorpaySuccessResponse) {
    apiService.post(`${this.base}/verify`, data);
  }
  async cancelOrder(orderId: string) {
    return apiService.put(`${this.base}/cancel`, { orderId });
  }
}

export const orderService = new OrderService();
