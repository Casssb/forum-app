import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './slices/authModalSlice';
import communityModalReducer from './slices/communityModalSlice';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    communityModal: communityModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
