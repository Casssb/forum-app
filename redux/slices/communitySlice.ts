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
}

export interface UserCommunityInfoProps {
  communityId: string;
  isAdmin?: boolean;
}

interface CommunityStateProps {
  userCommunityInfo: UserCommunityInfoProps[];
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
    resetCommunityInfo: () => initialState,
  },
});

export const { setUserCommunities, resetCommunityInfo, appendCommunityInfo, removeCommunityInfo } =
  communitySlice.actions;

export default communitySlice.reducer;
