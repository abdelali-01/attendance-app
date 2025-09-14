import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role : null ,
  loading: false,
  checkLoading : true,
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
    },

    checked: (state)=>{
      state.checkLoading = false;
    }
  },
});


export const {request , login , logout , checked} = userSlice.actions ;
export default userSlice.reducer ;
