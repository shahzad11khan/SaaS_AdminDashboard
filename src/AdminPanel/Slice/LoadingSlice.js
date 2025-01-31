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

export const {setLoading} = LoadingSlice.actions;
export default LoadingSlice.reducer;

