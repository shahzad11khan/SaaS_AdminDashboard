import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from '../Components/api/baseUri'
import { Warehouse_Middle_Point } from '../Components/api/middlePoints'
import fetchData from '../Components/api/axios'


export const fetchWarehouse = createAsyncThunk("warehouse/fetchWarehouse", async()=>{
    const URL =baseUri + Warehouse_Middle_Point
    const method ="GET";
    const response = await fetchData(URL,method);
    console.log("API Response:", response); 
    return response
})

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState:{
        data:[],
        loading:false,
        error:false,
    },

   extraReducers: (builder) => {
   
           builder.addCase(fetchWarehouse.pending, (state) => {
               state.loading=true
             })
         
         builder.addCase(fetchWarehouse.fulfilled, (state, action) => {
           state.loading=false,
           state.data=action.payload
         })
   
         builder.addCase(fetchWarehouse.rejected, (state, action) => {
           state.loading=false,
           state.error=action.error.message
         })
       },
     })
   
     export default warehouseSlice.reducer;