import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
    name :'loading',
    initialState :{
        isLoading:false,
    },

    reducers :{
        setLoading:(state)=>{
            state.isLoading=!state.isLoading
        },
    },
}) ;

export default LoadingSlice.reducer;

