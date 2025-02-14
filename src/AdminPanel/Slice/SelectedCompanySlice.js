import { createSlice } from "@reduxjs/toolkit";

const SelectedCompanySlice = createSlice({
    name :'selectedCompany',
    initialState :{
        companyId:null,
        companyName: null
    },

    reducers :{
        selectCompany:(state , action)=>{
            console.log(action)
            state.companyId =  action.payload.cId;
            state.companyName = action.payload.cName
        },
        removeSelectedCompany:(state) =>{
            state.companyId = null;
            state.companyName = null;
        }
    },
}) ;

export const {selectCompany , removeSelectedCompany} = SelectedCompanySlice.actions;
export default SelectedCompanySlice.reducer;

