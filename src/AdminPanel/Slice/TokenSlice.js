import { createSlice } from "@reduxjs/toolkit"
import {jwtDecode} from 'jwt-decode'

const tokenSlice = createSlice({
    name : 'token',
    initialState:{
        token:null,
        userId: null,
        loginCompanyName: null,
        companyLogo: null
    },
    reducers:{
        saveToken:(state , action)=>{
            console.log(jwtDecode(action.payload));
            let {userId , companyLogo , companyName , companyId ,userImage , userName , role    } = jwtDecode(action.payload);
            if(role === 'user' ){
                state.userId = companyId;
                state.companyLogo = userImage;
                state.loginCompanyName= userName;
            }
            else if(role === 'superadmin'){
                    state.userId = null
            }
            else{
                state.companyLogo = companyLogo;
                state.userId = userId;
                state.loginCompanyName = companyName;
            }
            state.token = action.payload;
        }
    }
}) 

export const {saveToken} = tokenSlice.actions;
export default tokenSlice.reducer;
