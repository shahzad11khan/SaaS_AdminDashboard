import { createSlice } from "@reduxjs/toolkit";

const SelectedCompanySlice = createSlice({
    name :'selectedCompany',
    initialState :{
        companyId:null,
        companyName: null,
        companyImg:null,
    },

    reducers :{
        selectCompany:(state , action)=>{
            console.log(action)
            state.companyId =  action.payload.cId;
            state.companyName = action.payload.cName;
            state.companyImg = action.payload.cImg;
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

