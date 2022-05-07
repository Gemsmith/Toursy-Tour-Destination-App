import Axios from 'axios';

// This file only has the API calls defined inside it.

const API = Axios.create({
  baseURL: 'http://localhost:5000/auth',
});

export const getUserFromServerAPI = () => {
  return API.get('http://localhost:5000/auth/fetchLoggedInUser', {
    withCredentials: true,
  });
};

export const localLoginAPI = (loginEmail, loginPassword) => {
  // We need to return the axios call here, to get the response out and into response variable at the authSlice in "const response =".
  // Keep in mind "response" is automatically returned in the promise, so like if we put "const resp = API.post(...)" below, axios.post's return will be stored in the 'resp'. But since this call is wrapped inside another function to get the return value to that wrapper function, we need to just add a return to the axios call. Which means we don't need to do .then() here. We only need .then((res) => {localStogareSave(res)}) if we actually want to do something with the "response.data", like ex. save "response.data" to local storage.
  return API.post(
    '/loginlocal',
    {
      email: loginEmail,
      password: loginPassword,
    },
    // Even though at the time of login there shouldn't be any sid or cookie at the client, still we need to pass the {withCredentials: true}, in the login request below. Because it is needed to get the cookie back from the server too. And if we login without this, sevrer will send the user object back ok, but won't send the cookie back to the client and all subsequent requests from client to the protected routes will fail with "Axios:Network Error 401".
    // That's why we need to add {withCredentials: true} in the login.
    {
      withCredentials: true,
    }
  );
};

export const localSignupAPI = (
  email,
  password,
  cPassword,
  firstName,
  lastName
) => {
  return API.post('/signuplocal', {
    email: email,
    password: password,
    cPassword: cPassword,
    fullName: firstName + ' ' + lastName,
  });
};

export const googleLoginSignup = () => {
  window.open('http://localhost:5000/auth/google', '_self');
};

export const facebookLoginSignup = () => {
  window.open('http://localhost:5000/auth/facebook', '_self');
};

export const twitterLoginSignup = () => {
  window.open('http://localhost:5000/auth/twitter', '_self');
};
