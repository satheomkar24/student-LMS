import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IInstructor } from "@satheomkar24/common-types";

type InitialState = {
  instructors: IInstructor[];
};
const initialState: InitialState = {
  instructors: [],
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    setInstructors: (state, action: PayloadAction<IInstructor[]>) => {
      state.instructors = action.payload;
    },
  },
});

export const { setInstructors } = instructorSlice.actions;
export default instructorSlice.reducer;
