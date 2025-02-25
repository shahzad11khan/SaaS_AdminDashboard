import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from '../Components/api/baseUri'
import { Tag_Middle_Point } from '../Components/api/middlePoints'
import { Tag_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'


export const fetchTag = createAsyncThunk("tags/fetchTag", async()=>{
    const URL =baseUri + Tag_Middle_Point +Tag_End_Point;
    const method ="GET";
    const response = await fetchData(URL,method);
    return response.data
})

const tagSlice = createSlice({
    name: "tags",
    initialState:{
        data:[],
        loading:false,
        error:false,
    },

   extraReducers: (builder) => {
   
           builder.addCase(fetchTag.pending, (state) => {
               state.loading=true
             })
         
         builder.addCase(fetchTag.fulfilled, (state, action) => {
           state.loading=false,
           state.data=action.payload
         })
   
         builder.addCase(fetchTag.rejected, (state, action) => {
           state.loading=false,
           state.error=action.error.message
         })
       },
     })
   
     export default tagSlice.reducer;