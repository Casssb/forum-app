/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  creator: string;
  creatorDisplayName: string;
  communityId: string;
  title: string;
  body?: string;
  totalComments: number;
  numOfVotes: number;
  imageURL?: string;
  communityImageURL?: string;
  link?: string;
  createdAt: Timestamp;
}

interface PostsProps {
  selectedPost: Post | null;
  posts: Post[];
}

const initialState: PostsProps = {
  selectedPost: null,
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts.concat(action.payload);
    },
  },
});

export const { addPosts } = postsSlice.actions;

export default postsSlice.reducer;
