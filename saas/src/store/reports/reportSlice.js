import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: null,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = null;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
      state.error = null;
    },
    addReport: (state, action) => {
      if (state.reports) {
        state.reports.push(action.payload);
      } else {
        state.reports = [action.payload];
      }
      state.loading = false;
      state.error = null;
    },
    removeReport: (state, action) => {
      if (state.reports) {
        state.reports = state.reports.filter(report => report._id !== action.payload);
      }
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  request, 
  setReports, 
  addReport, 
  removeReport, 
  setError, 
  clearError 
} = reportSlice.actions;

export default reportSlice.reducer;