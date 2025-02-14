import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUri } from "../Components/api/baseUri";
import { Permission_Middle_Point } from "../Components/api/middlePoints";
// import { Add_User_End_Point } from "../Components/api/endPoint";
import fetchData from "../Components/api/axios";

 export const getPermissions = createAsyncThunk('permission/getPermissions' , 
    async (_, { rejectWithValue }) => {
        try {
          const URL = baseUri + Permission_Middle_Point;
          const method = "GET";
          const response = await fetchData(URL, method);
          console.log(response.permission)
          return response.data.permission;
        } catch (error) {
          return rejectWithValue(error.message || "Failed to fetch permissions");
        }
    }
)

const PermissionSlice = createSlice({
    name :'permission',
    initialState :{
        permissions:null,
        loading:null,
        error:null
    },
    reducers :{},
    extraReducers: (builder) =>{
        builder
        .addCase(getPermissions.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPermissions.fulfilled, (state, action) => {
            console.log("hello")
            console.log(action)
            state.loading = false;
            state.permissions = action.payload;
        })
        .addCase(getPermissions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
}) ;

export default PermissionSlice.reducer;