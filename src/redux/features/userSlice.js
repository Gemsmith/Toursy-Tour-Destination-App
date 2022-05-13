import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';

// Thunks
// Runs on app load & if there's no user found at localStorage.
export const getLoggedInUserThunk = () => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getLoggedInUserFromServerAPI();
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch(setLoggedInUserValue(response.data.user));
    dispatch(setLoadingValue(false));
  } catch (error) {
    dispatch(setLoadingValue(false));
    console.log(error);
  }
};

export const getUserByIdThunk = (userId) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getUserFromServerAPI(userId);
    dispatch(setCurrentUserValue(response.data.user));
    dispatch(setLoadingValue(false));
  } catch (error) {
    dispatch(setLoadingValue(false));
    console.log(error);
  }
};

// Slice
const UserSlice = createSlice({
  name: 'user',
  initialState: { loggedInUser: null, currentUser: null, loading: false },
  reducers: {
    setLoadingValue: (state, action) => {
      state.loading = action.payload;
    },
    setLoggedInUserValue: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setCurrentUserValue: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Exports
export const { setLoadingValue, setLoggedInUserValue, setCurrentUserValue } =
  UserSlice.actions;
export default UserSlice.reducer;
