import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false 
}

const loadingSlice = createSlice({
    name : 'loading' ,
    initialState ,
    reducers : {
        setLoading : (state)=>{
            state.loading = true
        },
        removeLoading : (state)=>{
            state.loading = false 
        }
    }
});

export const {setLoading , removeLoading} = loadingSlice.actions ;
export default loadingSlice.reducer ;