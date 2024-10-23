import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from './../../services/axiosInstance';

// Add to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
  try {
    if (!item || !item._id) {
      throw new Error('Product ID (item._id) is missing or item is undefined');
    }

    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    let cart = JSON.parse(sessionStorage.getItem('cart')) || { data: { cart: { items: [] } } };

    const items = cart.data.cart.items;

    const existingItem = items.find(i => i.product._id === item._id);

    // Ensure full product details are added for guest users
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({
        product: {
          _id: item._id,
          name: item.name,   // Include product name
          image: item.image, // Include product image
          price: item.price  // Include product price
        },
        quantity: 1
      });
    }
    console.log("cart   before   adding",cart)
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // If authenticated, sync with backend
    if (isAuthenticated) {
      const productToSend = { productId: item._id, quantity: existingItem ? existingItem.quantity : 1 };
      await axiosInstance.post('/cart/addcart', productToSend);
    }

    toast.success('Item added to cart!');
    return cart;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add item to cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
  }
});

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    // Fetch cart from backend for authenticated users
    if (isAuthenticated) {
      const response = await axiosInstance.get('/cart/cart');
      sessionStorage.setItem('cart', JSON.stringify(response.data));
      return response.data;
    } else {
      // For guest users, retrieve cart from sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('cart')) || { data: { cart: { items: [] } } };
      return cart;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { rejectWithValue }) => {
  try {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      const response = await axiosInstance.delete(`/cart/remove/${productId}`);
      console.log(response.data)
      console.log(response.data.cart)
      return response.data;
    
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || { data: { cart: { items: [] } } };
      const updatedCart = cart.data.cart.items.filter(item => item.product._id !== productId);
      sessionStorage.setItem('cart', JSON.stringify({ data: { cart: { items: updatedCart } } }));
      return { data: { cart: { items: updatedCart } } };
    }
  } catch (error) {
    toast.error('Failed to remove item from cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
  }
});

// Update Item Quantity
export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      console.log("slice",productId,quantity)
      const response = await axiosInstance.put(`/cart/update/${productId}`, { productId, quantity });
      return response.data;
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || { data: { cart: { items: [] } } };
      const item = cart.data.cart.items.find(i => i.product._id === productId);

      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          const updatedCart = cart.data.cart.items.filter(i => i.product._id !== productId);
          sessionStorage.setItem('cart', JSON.stringify({ data: { cart: { items: updatedCart } } }));
          return { data: { cart: { items: updatedCart } } };
        }
      }

      sessionStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
  } catch (error) {
    toast.error('Failed to update item quantity');
    return rejectWithValue(error.response?.data?.message || 'Failed to update item quantity');
  }
});

// Clear Cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      await axiosInstance.delete('/cart/clear');
      return { data: { cart: { items: [] } } };
    } else {
      sessionStorage.setItem('cart', JSON.stringify({ data: { cart: { items: [] } } }));
      return { data: { cart: { items: [] } } };
    }
  } catch (error) {
    toast.error('Failed to clear cart');
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
  }
});

// Initial State
const initialState = {
  cartItems: [], 
  loading: false,
  error: null,
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
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
        state.cartItems = action.payload.data.cart.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.data.cart.items;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.data.cart.items;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.data.cart.items;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;
