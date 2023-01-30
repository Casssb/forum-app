/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface communityProps {
  id: boolean;
  creator: string;
  members: number;
  type: 'public' | 'private' | 'restricted';
  createdAt?: Timestamp;
  nsfw: boolean;
}

interface Communities {
  communities: communityProps[];
}

const initialState: Communities = {
  communities: [],
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},
});

export const {} = communitySlice.actions;

export default communitySlice.reducer;
