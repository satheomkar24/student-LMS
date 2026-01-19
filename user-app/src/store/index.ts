import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import instructorReducer from "./instructorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    instructor: instructorReducer,
  },
});

// 🔧 Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
