import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Slice/ThemeSlice';
import loadingReducer from '../Slice/LoadingSlice';
import orderReducer from '../Slice/OrderSlice';
import categoryReducer from '../Slice/CategorySlice'
import tagsReducer from '../Slice/TagSlice'
import warehouseReducer from '../Slice/WarehouseSlice'

 const Store = configureStore({
  reducer: {
    theme : themeReducer,
    loading: loadingReducer,
    orders :orderReducer,
    categories:categoryReducer,
    tags:tagsReducer,
    warehouse:warehouseReducer,
    
  },
})

export default Store;