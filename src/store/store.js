
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slice/cartSlice';
import authReducer from './Slice/authSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth:authReducer,

  },
});

export default store;
