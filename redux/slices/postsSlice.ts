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
    updatePostsArrayVoteValue: (state, action: PayloadAction<{ post: Post; vote: number }>) => {
      state.posts.forEach((elem) => {
        if (elem.id === action.payload.post.id) {
          elem.numOfVotes = action.payload.vote;
        }
      });
    },
    setPostVotes: (state, action: PayloadAction<PostVote[]>) => {
      state.postVotes = action.payload;
    },
    addNewPostVote: (state, action: PayloadAction<PostVote>) => {
      if (state.postVotes) {
        state.postVotes.push(action.payload);
      }
    },
    updatePostVote: (state, action: PayloadAction<{ id: string; vote: number }>) => {
      if (state.postVotes) {
        state.postVotes.forEach((elem) => {
          if (elem.id === action.payload.id) {
            elem.voteValue = action.payload.vote;
          }
        });
      }
    },
    deletePostVote: (state, action: PayloadAction<PostVote>) => {
      if (state.postVotes) {
        state.postVotes.splice(
          state.postVotes.findIndex((vote) => vote.id === action.payload.id),
          1
        );
      }
    },
    clearPostVotes: (state) => {
      if (state.postVotes) {
        state.postVotes = [];
      }
    },
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    updateSelectedPostVoteValue: (state, action) => {
      if (state.selectedPost) {
        state.selectedPost.numOfVotes = action.payload;
      }
    },
    incrementSelectedPostComments: (state) => {
      if (state.selectedPost) {
        state.selectedPost.totalComments += 1;
      }
    },
    decrementSelectedPostComments: (state) => {
      if (state.selectedPost) {
        state.selectedPost.totalComments -= 1;
      }
    },
  },
});

export const {
  addPosts,
  deleteSinglePost,
  updatePostsArrayVoteValue,
  setPostVotes,
  addNewPostVote,
  updatePostVote,
  deletePostVote,
  clearPostVotes,
  setSelectedPost,
  updateSelectedPostVoteValue,
  incrementSelectedPostComments,
  decrementSelectedPostComments,
} = postsSlice.actions;

export default postsSlice.reducer;
