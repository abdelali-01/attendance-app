import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: null,
  foundedClass: null,
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
      state.loading = false;
    },
    setFoundedClass: (state, action) => {
      state.foundedClass = action.payload;
      state.loading = false;
    },
  },
});

export const { request, setClasses , setFoundedClass} = classSlice.actions;
export default classSlice.reducer;
