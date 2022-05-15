import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AuthReducer from './features/authSlice';
import TourReducer from './features/tourSlice';
import UserReducer from './features/userSlice';

const reducers = combineReducers({
  auth: AuthReducer,
  tour: TourReducer,
  user: UserReducer,
});

const persistConfig = {
  key: 'tours_app',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, AuthReducer);
const persistedReducer = persistReducer(persistConfig, reducers);

// Here we have given a key "auth" for AuthReducer. What is the use of this key, well it is used to access the reducer from the store.
// Each reducer has it's own state variables. So Store contains --> Auth, User, Products (States) --> Each have their own State Variables,
// Here "AuthReducer" is actually "authSlice.reducer".
// So if authSlice has a state variable called "loading", then we can access it from the store by:
// const {loading} = useSelector(state => state.auth);
// NOTE: we needed to get it from the state.auth, this is where this key comes in use.
// export default configureStore({ reducer: { auth: persistedReducer } });

export const storeWithPersist = configureStore({
  // reducer: { auth: persistedReducer },
  reducer: persistedReducer, // https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
  // Need to provide these last few lines, because redux-persist throws an error:
  // "A non-serializable value was detected in an action, in the path: `register`." No idea what all of it means yet!
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
