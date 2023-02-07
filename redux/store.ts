import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './slices/authModalSlice';
import communityModalReducer from './slices/communityModalSlice';
import communityReducer from './slices/communitySlice';
import postFormReducer from './slices/postFormSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    communityModal: communityModalReducer,
    community: communityReducer,
    postForm: postFormReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
