import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Slice/ThemeSlice';
import loadingReducer from '../Slice/LoadingSlice';
import orderReducer from '../Slice/OrderSlice';
import categoryReducer from '../Slice/CategorySlice'
import tagsReducer from '../Slice/TagSlice'
import warehouseReducer from '../Slice/WarehouseSlice'
import deliverReducer from '../Slice/DeliverSlice'
import companyReducer from '../Slice/CompanySlice'
import selectedCompanySlice from '../Slice/SelectedCompanySlice'

 const Store = configureStore({
  reducer: {
    theme : themeReducer,
    loading: loadingReducer,
    orders :orderReducer,
    categories:categoryReducer,
    tags:tagsReducer,
    warehouse:warehouseReducer,
    deliver :deliverReducer,
    companies:companyReducer,
    selectedCompany:selectedCompanySlice,
  },
})

export default Store;