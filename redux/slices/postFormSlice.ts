/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type viewStateProps = 'post' | 'media' | 'poll' | 'talk' | 'link';

interface postFormProps {
  viewState: viewStateProps;
}

const initialState: postFormProps = {
  viewState: 'post',
};

export const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setpostFormView: (state, action: PayloadAction<viewStateProps>) => {
      state.viewState = action.payload;
    },
  },
});

export const { setpostFormView } = postFormSlice.actions;

export default postFormSlice.reducer;
