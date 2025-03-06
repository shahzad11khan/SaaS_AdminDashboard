import { createSlice } from "@reduxjs/toolkit";

const SelectedCompanySlice = createSlice({
    name :'selectedCompany',
    initialState :{
        companyId:null,
        companyName: null,
        companyImg:null,
        companyEmail:null,
        companyPhoneNumber:null,
        companyRegistrationNumber:null
        
    },

    reducers :{
        selectCompany:(state , action)=>{
            console.log(action)
            state.companyId =  action.payload.cId;
            state.companyName = action.payload.cName;
            state.companyImg = action.payload.cImg;
            state.companyEmail=action.payload.companyEmail;
            state.companyPhoneNumber=action.payload.companyPhoneNumber;
            state.companyRegistrationNumber= action.payload.companyRegistrationNumber
        },
        removeSelectedCompany:(state) =>{
            state.companyId = null;
            state.companyName = null;
            state.companyImg = null;
        }
    },
}) ;

export const {selectCompany , removeSelectedCompany} = SelectedCompanySlice.actions;
export default SelectedCompanySlice.reducer;

