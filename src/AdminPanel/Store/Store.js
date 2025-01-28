import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Slice/ThemeSlice';
 const Store = configureStore({
  reducer: {
    theme : themeReducer,
  },
})

export default Store;