import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from  '../Components/api/baseUri'
import { Companies_Middle_Point } from '../Components/api/middlePoints'
import fetchData from '../Components/api/axios'

export const fetchCompanies = createAsyncThunk("companies/fetchCompanies", async (_,thunkApi) => {
    const URL = baseUri + Companies_Middle_Point;
    const method = "GET";
    const response = await fetchData(URL, method);
    if(response.status !== 200){
        return thunkApi.rejectWithValue('something went wrong')
    }
    return response.data;
});

const companySlice = createSlice({
    name: 'companies',
    initialState: {
        data: [],
        loading: true,
        error: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCompanies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.data =  action.payload.companies;
        });

        builder.addCase(fetchCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});


export default companySlice.reducer;
