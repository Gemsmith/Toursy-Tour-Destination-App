import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'persisted-redux-store',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

// Here we have given a key "auth" for AuthReducer. What is the use of this key, well it is used to access the reducer from the store.
// Each reducer has it's own state variables. So Store contains --> Auth, User, Products (States) --> Each have their own State Variables,
// Here "AuthReducer" is actually "authSlice.reducer".
// So if authSlice has a state variable called "loading", then we can access it from the store by:
// const {loading} = useSelector(state => state.auth);
// NOTE: we needed to get it from the state.auth, this is where this key comes in use.
// export default configureStore({ reducer: { auth: persistedReducer } });

export const store = configureStore({
  reducer: { auth: persistedReducer },
});
