import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classes : null ,
    loading : false ,
    error : null ,
}

const classSlice = createSlice({
    name : "classes" ,
    initialState ,
    reducers : {

    }
})