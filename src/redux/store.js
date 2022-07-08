import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import TourReducer from './features/tourSlice';
import UserReducer from './features/userSlice';

const reducers = combineReducers({
  auth: AuthReducer,
  tour: TourReducer,
  user: UserReducer,
});

export const store = configureStore({
  reducer: reducers, // https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
});
