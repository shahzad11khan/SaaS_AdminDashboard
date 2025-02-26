import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from  '../Components/api/baseUri'
import { Deliver_Middle_Point } from '../Components/api/middlePoints'
import { Deliver_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'

export const fetchDelivery = createAsyncThunk("categories/fetchCategories", async () => {
    const URL = baseUri + Deliver_Middle_Point + Deliver_End_Point;
    const method = "GET";
    const response = await fetchData(URL, method);
    console.log(response)
    return response.data;
});

const deliverSlice = createSlice({
    name: 'deliver',
    initialState: {
        data: [],
        loading: false,
        error: false,
    },
    reducers:{},

    extraReducers: (builder) => {
        builder.addCase(fetchDelivery.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchDelivery.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.deliveredOrders;
        });

        builder.addCase(fetchDelivery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export default deliverSlice.reducer;
