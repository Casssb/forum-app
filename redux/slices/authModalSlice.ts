/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type viewStateProps = 'new' | 'existing';

interface authModalProps {
  isModalOpen: boolean;
  viewState: viewStateProps;
}

const initialState: authModalProps = {
  isModalOpen: false,
  viewState: 'new',
};

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setModalView: (state, action: PayloadAction<viewStateProps>) => {
      state.viewState = action.payload;
    },
  },
});

export const { setModalOpen, setModalView } = authModalSlice.actions;

export default authModalSlice.reducer;
