
import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (e) {
    console.error('Error loading user from localStorage:', e);
    return null;
  }
};


const saveUserToStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (e) {
    console.error('Error saving user to localStorage:', e);
  }
};


const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.error('Error removing user from localStorage:', e);
  }
};


const initialState = {
  user: loadUserFromStorage(), 
  isLoading: false,  
  isAuthenticated: !!loadUserFromStorage(), 
  error: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
      state.error = null; 
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload; 
      saveUserToStorage(action.payload);
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; 
      removeUserFromStorage(); 
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null; // Clear errors
      removeUserFromStorage(); // Remove user data from localStorage on logout
    },
    setUser(state, action) {
      state.user = action.payload; // Update user info without triggering login state changes
      saveUserToStorage(action.payload); // Persist updated user info
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
