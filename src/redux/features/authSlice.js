import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';
import { setLoggedInUserValue } from './userSlice';
// Why are we not using createAsyncThunk? https://stackoverflow.com/questions/64850725/reactjs-and-redux-toolkit-can-i-use-createasyncthunk-to-execute-non-async-s
// Mainly because of all the abstraction with it. Error handling was becoming too much of a hassle with the server's error response setup, and this way we can handle the errors ourselves without needing to worry about what is happening behind the scenes with createAsyncThunk.

//====================================================================================================
// Action Creators

export const localLoginThunk = (loginFormDataObject) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  const { loginEmail, loginPassword } = loginFormDataObject;

  try {
    const response = await api.localLoginAPI(loginEmail, loginPassword);
    if (response.data.status === 'success') {
      toast.success('Login Successful!');
      // Not storing the user in local storage for "loggedIn" verification, because we haven't implemented JWT in passportJS, with which we could have stored jwtToken (created and sent by the server) in local storage and then send it with every protected route request, to make sure the req is from loggedIn user.
      // Instead we are storing the user.id in the session at MongoDB, and when user makes a request in the passport.deserializeUser() function, we'll fetch the user from the DB and store it in the session.
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(setLoggedInUserValue(response.data.user));
      dispatch(setLoadingValue(false));
      // window.location.href = '/';
      return;
    } else if (response.data.status === 'error') {
      toast.error(response.data.message);
      dispatch(setLoadingValue(false));
    }
  } catch (error) {
    // If we don't use .then, .catch in axios above, The catch block here can also intercept the error message. So essentially, any error in the above block is passed as is to this catch block.
    console.log(error);
    toast.error(error.message);
  }
};

export const localSignupThunk = (signupFormDataObject) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  const { email, password, cPassword, firstName, lastName } = signupFormDataObject;

  try {
    const response = await api.localSignupAPI(
      email,
      password,
      cPassword,
      firstName,
      lastName
    );

    if (response.data.status === 'success') {
      toast.success('User created successfully!');
      dispatch(setLoadingValue(false));
      // window.location.href = '/';
      return;
    } else if (response.data.status === 'error') {
      toast.error(response.data.message);
      dispatch(setLoadingValue(false));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

//====================================================================================================
// Slice Config & Export
const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false },
  reducers: {
    setLoadingValue: (state, action) => {
      state.loading = action.payload;
    },
    // setLoggedInUserValue: (state, action) => {
    //   state.loggedInUser = action.payload;
    // },
  },
});

export const { setLoadingValue } = authSlice.actions;
export default authSlice.reducer;
