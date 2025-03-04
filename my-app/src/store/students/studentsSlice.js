import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: null,
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
      state.loading = false;
    },
  },
});

export const { request, setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
