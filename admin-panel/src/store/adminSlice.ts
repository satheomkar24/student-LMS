import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAdmin } from "@satheomkar24/common-types";

type InitialState = {
  admins: IAdmin[];
};
const initialState: InitialState = {
  admins: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmins: (state, action: PayloadAction<IAdmin[]>) => {
      state.admins = action.payload;
    },
  },
});

export const { setAdmins } = adminSlice.actions;
export default adminSlice.reducer;
