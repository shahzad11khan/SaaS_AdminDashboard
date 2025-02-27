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
import permissionSlice from '../Slice/PermissionSlice'
import tokenSlice  from '../Slice/TokenSlice';
import chatbotReducer from '../Slice/BotSlice';
import socketSliceReducer from '../Slice/socketSlice'

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
    chatbot:chatbotReducer,
    selectedCompany:selectedCompanySlice,
    permission:permissionSlice,
    authenticate:tokenSlice,
    socket :socketSliceReducer
  },
})

export default Store;