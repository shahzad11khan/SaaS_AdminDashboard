import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Slice/ThemeSlice';
import loadingReducer from '../Slice/LoadingSlice';

 const Store = configureStore({
  reducer: {
    theme : themeReducer,
    loading: loadingReducer,
  },
})

export default Store;