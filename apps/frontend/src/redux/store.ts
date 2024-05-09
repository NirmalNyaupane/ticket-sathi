'use client';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import userReducer from './slices/user.slice';
import organizerReducer from './slices/organizer.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    organizer:organizerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
