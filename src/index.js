import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { storeWithPersist } from './redux/storeWithPersist';
import { storeNoPersist } from './redux/storeNoPersist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Non-persistent store
// root.render(
//   <Provider store={storeNoPersist}>
//     <App />
//   </Provider>
// );

// Persistant Store: Was causing app to slow down quite significantly like 1 second pauses on TourDetails Page.
// So I switched back to non-persistent store.
export const persistor = persistStore(storeWithPersist);

root.render(
  <Provider store={storeWithPersist}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
