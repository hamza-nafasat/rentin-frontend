const { createSlice } = require('@reduxjs/toolkit');

// Helper to safely access localStorage (avoids errors in SSR)
const getStoredAuth = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        return JSON.parse(storedAuth);
      }
    } catch (error) {
      console.error('Error retrieving auth from localStorage:', error);
    }
  }
  return { user: null, isAuthenticated: false };
};

// Helper to extract user role
const extractUserRole = userData => {
  if (!userData) return null;
  return userData.role || userData.user?.role || userData.user?.data?.role || userData.data?.role;
};

// Initialize from localStorage if available
const initialState = getStoredAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('Setting user in Redux:', action.payload);

      if (!action.payload) {
        console.warn('Received null/undefined user payload');
        state.user = null;
        state.isAuthenticated = false;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth');
        }
        return;
      }

      // Ensure proper user data structure
      const userData = action.payload;
      const role = extractUserRole(userData);

      if (!role) {
        console.error('No role found in user data:', userData);
        return;
      }

      // Set state with proper structure
      state.user = {
        ...userData,
        role: role,
      };
      state.isAuthenticated = true;

      // Persist auth state to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('auth', JSON.stringify(state));
        } catch (error) {
          console.error('Error storing auth in localStorage:', error);
        }
      }
    },
    deleteUser: state => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear localStorage on logout
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('auth');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        } catch (error) {
          console.error('Error removing auth from localStorage:', error);
        }
      }
    },
  },
});

export const { setUser, deleteUser } = authSlice.actions;
export default authSlice;
