import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from '../Components/api/baseUri'
import { Chatbot_End_Point } from '../Components/api/endPoint';
import fetchData from '../Components/api/axios'

export const fetchChatbot = createAsyncThunk("chatbot/fetchChatbot", async (data, thunkApi) => {
    try {

        const URL = baseUri + Chatbot_End_Point;
        const method = "POST";
        const response = await fetchData(URL, method, { data });
        console.log("chatbot response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue('error')
    }
});

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        data: [],
        loading: false,
        error: false
    },

    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchChatbot.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchChatbot.fulfilled, (state, action) => {
            console.log(action.payload.response)
            state.loading = false;
            state.data = action.payload.response;
        });
        builder.addCase(fetchChatbot.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });


    },
});


export default chatbotSlice.reducer;
