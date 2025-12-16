import { connectDB } from "@config/db";
import { env } from "@config/env";
import app from "app";

export const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
};
