import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IStudent } from "@satheomkar24/common-types";

type InitialState = {
  students: IStudent[];
};
const initialState: InitialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.students = action.payload;
    },
  },
});

export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
