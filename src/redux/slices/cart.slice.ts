import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  CartList: [],
  totalItems: 0,
  CartPrice: 0,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export default cartReducer.reducer;
