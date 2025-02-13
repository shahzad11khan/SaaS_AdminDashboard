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
    },
}) ;

export const {selectCompany} = SelectedCompanySlice.actions;
export default SelectedCompanySlice.reducer;

