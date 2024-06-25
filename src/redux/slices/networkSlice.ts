import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isConnected: true,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus(state, action) {
      state.isConnected = action.payload;
    },
  },
});

export const {setNetworkStatus} = networkSlice.actions;

export default networkSlice.reducer;
