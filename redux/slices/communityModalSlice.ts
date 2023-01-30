/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type viewStateProps = 'nav' | 'aside';

interface communityModalProps {
  isModalOpen: boolean;
  viewState: viewStateProps;
}

const initialState: communityModalProps = {
  isModalOpen: false,
  viewState: 'nav',
};

export const communityModalSlice = createSlice({
  name: 'communityModal',
  initialState,
  reducers: {
    setCommunityModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setCommunityModalView: (state, action: PayloadAction<viewStateProps>) => {
      state.viewState = action.payload;
    },
  },
});

export const { setCommunityModalOpen, setCommunityModalView } = communityModalSlice.actions;

export default communityModalSlice.reducer;
