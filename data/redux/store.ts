
'use client';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import slice from './features';

const persistConfig = {
  key: 'root',
  storage,
};

const combinered = combineReducers({
  cart: slice,
});

const reducer = persistReducer(persistConfig, combinered);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
