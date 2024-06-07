// networkSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface NetworkState {
  isInternetReachable: boolean;
}

const initialState: NetworkState = {
  isInternetReachable: false,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isInternetReachable = action.payload;
    },
  },
});

export const {setConnectionStatus} = networkSlice.actions;

export const selectConnectionStatus = (state: RootState) =>
  state.network.isInternetReachable;

export default networkSlice.reducer;
