import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUri } from '../Components/api/baseUri'
import { User_Middle_Point } from '../Components/api/middlePoints'
import { User_End_Point } from '../Components/api/endPoint'
import fetchData from '../Components/api/axios'

export const fetchUsers = createAsyncThunk("Users/fetchUsers",async(_, {rejectWithValue ,getState}) =>{
    try {
        const {companyId} =getState().selectedCompany;
        const {userId} =getState().authenticate
        const URL = baseUri + User_Middle_Point + User_End_Point;
        const method ="GET";
        const response = await fetchData(URL,method )

        let filterData = response.data.users;

        filterData = companyId
        ? filterData.filter(item => companyId === item.companyId?._id)
        : userId
          ? filterData.filter(item => userId === item.companyId?._id)
          : filterData;

      return filterData;
    
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.message)
    }
  
})

const userSlice = createSlice({
    name : "users",
    initialState :{
        data:[],
        loading:false,
        error:null,
    },
    reducers:{
        deleteUser:(state,action)=>{
            state.data = state.data.filter(user => user._id !== action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
                })
                builder.addCase(fetchUsers.fulfilled,(state,action)=>{
                    state.loading=true,
                    state.data=action.payload;
                    state.error=null
                })
                // builder.addCase(fetchData.rejected,(state,action)=>{
                //     state.loading=false;
                //     state.error=action.payload
                // })
    }



})
export const {deleteUser} = userSlice.actions
export default userSlice.reducer;