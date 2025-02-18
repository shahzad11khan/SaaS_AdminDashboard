import { createSlice } from "@reduxjs/toolkit"


const tokenSlice = createSlice({
    name : 'token',
    initialState:{
        token: null
    },
    reducers:{
        saveToken:(state , action)=>{
            state.token = action.payload
        }
    }
}) 

export const {saveToken} = tokenSlice.actions;
export default tokenSlice.reducer;
