import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import instructorReducer from "./instructorSlice";
import adminReducer from "./adminSlice";
import studentReducer from "./studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    instructor: instructorReducer,
    admin: adminReducer,
    student: studentReducer,
  },
});

// 🔧 Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
