import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './slices/authModalSlice';
import communityModalReducer from './slices/communityModalSlice';
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    communityModal: communityModalReducer,
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
