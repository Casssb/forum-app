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

export interface PostVote {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

interface PostsProps {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const initialState: PostsProps = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    deleteSinglePost: (state, action: PayloadAction<Post>) => {
      state.posts.splice(
        state.posts.findIndex((post) => post.id === action.payload.id),
        1
      );
    },
  },
});

export const { addPosts, deleteSinglePost } = postsSlice.actions;

export default postsSlice.reducer;
