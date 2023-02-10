/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface CommunityProps {
  id: string;
  creator: string;
  members: number;
  type: 'public' | 'private' | 'restricted';
  createdAt?: Timestamp;
  nsfw: boolean;
  imageURL?: string;
  bgImageURL?: string;
}

export interface UserCommunityInfoProps {
  communityId: string;
  isAdmin?: boolean;
  imageURL?: string;
}

interface CommunityStateProps {
  userCommunityInfo: UserCommunityInfoProps[];
  currentCommunity?: CommunityProps;
}

const initialState: CommunityStateProps = {
  userCommunityInfo: [],
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setUserCommunities: (state, action) => {
      state.userCommunityInfo = action.payload;
    },
    appendCommunityInfo: (state, action) => {
      state.userCommunityInfo.push(action.payload);
    },
    removeCommunityInfo: (state, action: PayloadAction<string>) => {
      state.userCommunityInfo.splice(
        state.userCommunityInfo.findIndex((community) => community.communityId === action.payload),
        1
      );
    },
    resetCommunityInfo: (state) => {
      state.userCommunityInfo = [];
    },
    addCurrentCommunity: (state, action: PayloadAction<CommunityProps>) => {
      state.currentCommunity = action.payload;
    },
    setCurrentCommunityBadge: (state, action) => {
      if (state.currentCommunity) {
        state.currentCommunity.imageURL = action.payload;
      }
    },
    setCurrentCommunityBackground: (state, action) => {
      if (state.currentCommunity) {
        state.currentCommunity.bgImageURL = action.payload;
      }
    },
  },
});

export const {
  setUserCommunities,
  resetCommunityInfo,
  appendCommunityInfo,
  removeCommunityInfo,
  addCurrentCommunity,
  setCurrentCommunityBadge,
  setCurrentCommunityBackground,
} = communitySlice.actions;

export default communitySlice.reducer;
