import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from '../Components/api/baseUri'
import { Order_Middle_Point } from '../Components/api/middlePoints'
import { Order_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'

export const fetchOrder = createAsyncThunk("orders/fetchOrder",async()=>{
    const URL =baseUri + Order_Middle_Point +Order_End_Point;
    const method ="GET";
    const response = await fetchData(URL,method);
    console.log(response)
    return response
})

const orderSlice = createSlice({
    name: 'orders',
    initialState:{
        data:[],
        loading:false,
        error:false,
    },

    extraReducers: (builder) => {

        builder.addCase(fetchOrder.pending, (state) => {
            state.loading=true
          })
      
      builder.addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading=false,
        console.log(action.payload)
        state.data=action.payload
      })

      builder.addCase(fetchOrder.rejected, (state, action) => {
        state.loading=false,
        state.error=action.error.message
      })
    },
  })

  export default orderSlice.reducer;