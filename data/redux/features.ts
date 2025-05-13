'use client';

import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  total: string;
  discount: string;
  delivery: string;
  cart: object;
  currency: string;
  lastwatched: object;
  customer: object;
};

const initialState: initialStateType = {
  total: '0',
  discount: '0',
  delivery: '0',
  cart: {},
  currency: 'cedi',
  lastwatched: {},
  customer: {},
};

const slice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addToCart(state, payload) {
      state.cart = { ...state.cart, ...payload.payload };

      state.total = Object.values(state.cart).reduce((a, b) => {
        return Number(b.total) + Number(a);
      }, 0);
    },
    addLastwatched(state, payload) {
      state.lastwatched = { ...state.lastwatched, ...payload.payload };
    },
    deleteLastwatched(state) {
      state.lastwatched = {};
    },
    addCustomer(state, payload) {
      state.customer = { ...payload.payload };
    },
    deleteCustomer(state) {
      state.customer = {};
    },
    deleteCart(state, payload) {
      state.cart = { ...payload.payload };
      state.total = Object.values(state.cart).reduce((a, b) => {
        return Number(b.price) + Number(a);
      }, 0);
    },
    setCurrency(state, payload) {
      state.currency = payload.payload;
    },
  },
});

export default slice.reducer;

export const {
  addToCart,
  deleteCart,
  setCurrency,
  addLastwatched,
  deleteLastwatched,
  addCustomer,
  deleteCustomer
} = slice.actions;
