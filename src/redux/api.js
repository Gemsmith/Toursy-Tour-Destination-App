import Axios from 'axios';

// This file only has the API calls defined inside it.

const API = Axios.create({
  baseURL: 'http://localhost:5000',
});

// User APIs
export const getLoggedInUserFromServerAPI = () => {
  return API.get('/user/fetchLoggedInUser', {
    withCredentials: true,
  });
};

export const getUserFromServerAPI = (userId) => {
  return API.get(`/user/${userId}`);
};

// Auth APIs
export const localLoginAPI = (loginEmail, loginPassword) => {
  // We need to return the axios call here, to get the response out and into response variable at the authSlice in "const response =".
  // Keep in mind "response" is automatically returned in the promise, so like if we put "const resp = API.post(...)" below, axios.post's return will be stored in the 'resp'. But since this call is wrapped inside another function to get the return value to that wrapper function, we need to just add a return to the axios call. Which means we don't need to do .then() here. We only need .then((res) => {localStogareSave(res)}) if we actually want to do something with the "response.data", like ex. save "response.data" to local storage.
  return API.post(
    '/auth/loginlocal',
    {
      email: loginEmail,
      password: loginPassword,
    },
    // Even though at the time of login there shouldn't be any sid or cookie at the client, still we need to pass the {withCredentials: true}, in the login request below. Because it is needed to get the cookie back from the server too. And if we login without this, server will send the user object back ok, but won't send the cookie back to the client and all subsequent requests from client to the protected routes will fail with "Axios:Network Error 401".
    // That's why we need to add {withCredentials: true} in the login.
    {
      withCredentials: true,
    }
  );
};

export const localSignupAPI = (email, password, cPassword, firstName, lastName) => {
  return API.post('/auth/signuplocal', {
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

// Tour APIs
export const createNewTourAPI = (tourData) => {
  return API.post('/tour', tourData, {
    withCredentials: true,
  });
};

export const updateTourAPI = (tourId, updatedTourData) => {
  return API.patch(`/tour/${tourId}`, updatedTourData, { withCredentials: true });
};

export const deleteTourAPI = (tourId) => {
  return API.delete(`/tour/${tourId}`, { withCredentials: true });
};

export const getAllToursAPI = () => {
  return API.get('/tour');
};

export const getTourAPI = (tourId) => {
  return API.get(`/tour/${tourId}`);
};

export const getUsersToursAPI = (userId) => {
  return API.get(`/tour/usersTours/${userId}`, { withCredentials: true });
};

export const getToursBySearchAPI = (searchQuery) => {
  return API.get(`/tour/search?searchQuery=${searchQuery}`);
};

export const getToursByTagAPI = (tag) => {
  return API.get(`/tour/tag/${tag}`);
};

export const getRelatedToursAPI = (tags) => {
  return API.post(`/tour/relatedTours`, tags);
};
