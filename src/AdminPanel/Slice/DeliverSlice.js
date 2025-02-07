import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from  '../Components/api/baseUri'
import { Deliver_Middle_Point } from '../Components/api/middlePoints'
import { Deliver_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const URL = baseUri + Deliver_Middle_Point + Deliver_End_Point;
    const method = "GET";
    const response = await fetchData(URL, method);
    return response;
});

const deliverSlice = createSlice({
    name: 'deliver',
    initialState: {
        data: [],
        loading: false,
        error: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export default deliverSlice.reducer;
