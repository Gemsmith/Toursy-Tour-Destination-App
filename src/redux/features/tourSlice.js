import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';

//============Action Creators=======================================================
// Creates a new tour
export const createNewTourThunk = (tourData) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));
  try {
    const response = await api.createNewTourAPI(tourData);

    if (response.data.status === 'success') {
      dispatch(setLoadingValue(false));
      console.log('Created Tour: ', response.data.newTour);

      // Updating FE's "allTours" without calling BE
      const { allTours } = getState().tour;
      const newAllTours = [...allTours, response.data.newTour];
      dispatch(setAllToursValue(newAllTours));
      // Updating FE's "usersTours" States without calling BE
      const { usersTours } = getState().tour;
      const newUsersTours = [...usersTours, response.data.newTour];
      dispatch(setUsersToursValue(newUsersTours));

      toast.success('Tour created successfully!');

      // window.location.href = '/'
    }
  } catch (error) {
    console.log(error);
    toast.error('Please make sure all fields are filled including the image!');
    dispatch(setLoadingValue(false));
  }
};

// Is called at every app render.
export const getAllToursThunk = (page) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getAllToursAPI(page);
    console.log(response.data);
    if (response.data.status === 'success') {
      console.log('All Tours: ', response.data);
      dispatch(setLoadingValue(false));
      // dispatch(setAllToursValue(response.data.allTours));
      dispatch(setAllToursValue(response.data.paginatedTours));
      dispatch(setNumberOfPagesValue(response.data.numberOfPages));
      dispatch(setCurrentPageValue(response.data.currentPage));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

// Is called when we click on a Card to load the tour details.
export const getTourThunk = (tourId) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getTourAPI(tourId);

    if (response.data.status === 'success') {
      console.log('Clicked Tour: ', response.data);
      dispatch(setLoadingValue(false));
      dispatch(setTourValue(response.data.tour));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

// Is called when a loggedIn user enters their "Dashboard"
export const getUsersToursThunk = (userId) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getUsersToursAPI(userId);

    if (response.data.status === 'success') {
      console.log("Users' Tours (Dashboard): ", response.data);
      dispatch(setLoadingValue(false));
      dispatch(setUsersToursValue(response.data.usersTours));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

// Is called when a loggedIn user enters their "Dashboard" & updates one of their tours.
export const updateTourThunk =
  (tourId, updatedTourData) => async (dispatch, getState) => {
    dispatch(setLoadingValue(true));

    try {
      const response = await api.updateTourAPI(tourId, updatedTourData);
      if (response.data.status === 'success') {
        console.log('Updated Tour: ', response.data);
        dispatch(setLoadingValue(false));

        // Updating FE's "allTours" without calling BE
        const { allTours } = getState().tour;
        const updatedAllTours = allTours.map((tour) =>
          tour._id === tourId ? response.data.updatedTour : tour
        );
        dispatch(setAllToursValue(updatedAllTours));

        // Updating FE's "usersTours" States without calling BE
        const { usersTours } = getState().tour;
        const updatedTours = usersTours.map((tour) =>
          tour._id === tourId ? response.data.updatedTour : tour
        );
        dispatch(setUsersToursValue(updatedTours));

        toast.success('Tour updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      dispatch(setLoadingValue(false));
    }
  };

// Is called when a loggedIn user enters their "Dashboard" & deletes one of their tours.
export const deleteTourThunk = (tourId) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.deleteTourAPI(tourId);
    if (response.data.status === 'success') {
      console.log('Deleted Tour: ', response.data);
      dispatch(setLoadingValue(false));

      // Updating FE's "allTours" without calling BE
      const { allTours } = getState().tour;
      const newAllTours = allTours.filter((tour) => tour._id !== tourId);
      dispatch(setAllToursValue(newAllTours));
      // Updating FE's "usersTours" States without calling BE
      const { usersTours } = getState().tour;
      const newUserTours = usersTours.filter((tour) => tour._id !== tourId);
      dispatch(setUsersToursValue(newUserTours));

      toast.success('Tour deleted successfully');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

export const getToursBySearchThunk = (searchQuery) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getToursBySearchAPI(searchQuery);
    console.log('Searched Tours: ', response.data);
    dispatch(setSearchedToursValue(response.data.searchedTours));
    dispatch(setLoadingValue(false));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

export const getToursByTagThunk = (tag) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getToursByTagAPI(tag);
    console.log('Tagged Tours: ', response.data);
    dispatch(setTaggedToursValue(response.data.taggedTours));
    dispatch(setLoadingValue(false));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

export const getRelatedToursThunk = (tags) => async (dispatch, getState) => {
  dispatch(setLoadingValue(true));

  try {
    const response = await api.getRelatedToursAPI(tags);
    console.log('Related Tours: ', response.data);
    dispatch(setRelatedToursValue(response.data.relatedTours));
    dispatch(setLoadingValue(false));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    dispatch(setLoadingValue(false));
  }
};

//====================================================================================================
// Slice Config & Export
const initialState = {
  currentPage: 1,
  numberOfPages: 0,
  tour: {},
  allTours: [],
  usersTours: [],
  searchedTours: [],
  taggedTours: [],
  relatedTours: [],
  loading: false,
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setLoadingValue: (state, action) => {
      state.loading = action.payload;
    },

    setTourValue: (state, action) => {
      state.tour = action.payload;
    },

    setCurrentPageValue: (state, action) => {
      state.currentPage = action.payload;
    },

    setNumberOfPagesValue: (state, action) => {
      state.numberOfPages = action.payload;
    },

    setAllToursValue: (state, action) => {
      state.allTours = action.payload;
    },

    setUsersToursValue: (state, action) => {
      state.usersTours = action.payload;
    },

    setSearchedToursValue: (state, action) => {
      state.searchedTours = action.payload;
    },

    setTaggedToursValue: (state, action) => {
      state.taggedTours = action.payload;
    },
    setRelatedToursValue: (state, action) => {
      state.relatedTours = action.payload;
    },
  },
});

export const {
  setLoadingValue,
  setTourValue,
  setAllToursValue,
  setUsersToursValue,
  setSearchedToursValue,
  setTaggedToursValue,
  setRelatedToursValue,
  setCurrentPageValue,
  setNumberOfPagesValue,
} = tourSlice.actions;
export default tourSlice.reducer;
