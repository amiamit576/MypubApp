import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Axios instance with credentials support
const axiosInstance = axios.create({
  withCredentials: true,
});

// Interceptor to handle any error globally if needed (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Async Thunks for cart operations with updated API URL
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`http://localhost:5000/api/v1/cart/cart`);
    return response.data.data.cart;
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Please log in to continue.');
    }
    return rejectWithValue(error.response?.data?.message || 'Something went wrong');
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`http://localhost:5000/api/v1/cart/cart`, {
      productId: item.id,
      quantity: 1,
    });
    toast.success('Item added to cart!');

    // Fetch the updated cart after adding the item
    dispatch(fetchCart());

    return response.data.data.cart; // Returning updated cart data
  } catch (error) {
    toast.error('Failed to add item to cart');
    return rejectWithValue(error.response?.data?.message || 'Something went wrong');
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/cart/${productId}`);
    toast.success('Item removed from cart!');

    // Fetch the updated cart after removing the item
    dispatch(fetchCart());

    return response.data.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Something went wrong');
  }
});

export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`http://localhost:5000/api/v1/cart/cart/${productId}`, { quantity });

    // Fetch the updated cart after updating the item quantity
    dispatch(fetchCart());

    return response.data.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Something went wrong');
  }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`http://localhost:5000/api/v1/cart/cart`);
    toast.info('Cart cleared!');

    // Fetch the updated cart after clearing it
    dispatch(fetchCart());

    return response.data.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Something went wrong');
  }
});

// Initial State
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items; // Ensure correct structure
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items; // Ensure correct structure
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items; // Ensure correct structure
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      })
      // Update Item Quantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.items; // Ensure correct structure
      });
  },
});

export default cartSlice.reducer;
