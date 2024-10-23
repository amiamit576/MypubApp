import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from './../../services/axiosInstance';

// Helper: Sync sessionStorage cart with backend for authenticated users
const syncCartWithBackend = async () => {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  await axiosInstance.post('/cart/sync', { cart });
};

// Add to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
  try {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; 
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const existingItem = cart.find(i => i.product._id === item._id); // Ensure product ID consistency
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity for existing item
    } else {
      cart.push({ product: item, quantity: 1 }); // Add new item
    }

    sessionStorage.setItem('cart', JSON.stringify(cart)); // Update sessionStorage

    if (isAuthenticated) {
      // Sync updated cart with the backend if the user is authenticated
      await axiosInstance.post('/cart/addcart', { productId: item._id, quantity: 1 });
    }

    toast.success('Item added to cart!');
    return cart; // Return updated cart
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add item to cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
  }
});

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      const response = await axiosInstance.get('/cart/cart');
      sessionStorage.setItem('cart', JSON.stringify(response.data)); // Sync with sessionStorage
      return response.data; // Return authenticated cart from the backend
    } else {
      return cart; // Return guest cart from sessionStorage
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { rejectWithValue }) => {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.product._id !== productId); // Remove item

    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Update sessionStorage

    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      // Update backend for authenticated users
      await axiosInstance.post('/cart/removecart', { productId });
    }

    toast.success('Item removed from cart!');
    return updatedCart; // Return updated cart
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to remove item from cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
  }
});

// Update Item Quantity
export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const item = cart.find(i => i.product._id === productId);

    if (item) {
      item.quantity = quantity; // Update quantity
      if (quantity <= 0) {
        const updatedCart = cart.filter(i => i.product._id !== productId); // Remove item if quantity is zero
        sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Update sessionStorage
        return updatedCart; // Return updated cart
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(cart)); // Always update sessionStorage

    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      await axiosInstance.post('/cart/updatecart', { productId, quantity }); // Sync with backend for authenticated users
    }

    return cart; // Return updated cart
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update item quantity');
    return rejectWithValue(error.response?.data?.message || 'Failed to update item quantity');
  }
});

// Clear Cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    sessionStorage.setItem('cart', JSON.stringify([])); // Clear cart for guest users
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      await axiosInstance.post('/cart/clear'); // Clear backend cart for authenticated users
    }

    toast.info('Cart cleared!');
    return []; // Return empty cart
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to clear cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
  }
});

// Initial State
const initialState = {
  cartItems: [], // Unified cart items for both guest and authenticated users
  loading: false,
  error: null,
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true', // Store authentication status
};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Update cart items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Update cart items
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Update cart items
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = []; // Clear cart items
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Update cart items
      });
  },
});

// Export reducer
export default cartSlice.reducer;
