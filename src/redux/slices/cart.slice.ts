import {createReducer} from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  REMOVE_ITEM,
} from './actionTypes';
import {CartItem} from './index';

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const newItem = action.payload as CartItem;
      // console.log(newItem)
      const existingItem = state.items.find(
        item =>
          item.id === newItem.id &&
          item.varietyList[0].value === newItem.varietyList[0].value,
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        // console.log(existingItem)
      } else {
        state.items.push(newItem);
      }
      state.totalPrice +=
        newItem.varietyList[0].discountPrice * newItem.quantity;
      console.log(state);
    })
    .addCase(INCREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToIncrement = state.items.find(item => item.id === itemId);
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        state.totalPrice += itemToIncrement.varietyList[0].discountPrice;
      }
      console.log(state);
    })
    .addCase(DECREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToDecrement = state.items.find(item => item.id === itemId);
      if (itemToDecrement && itemToDecrement.quantity >= 1) {
        itemToDecrement.quantity--;
        state.totalPrice -= itemToDecrement.varietyList[0].discountPrice;
      }
      console.log(state);
    })
    .addCase(REMOVE_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToDecrement = state.items.find(item => item.id === itemId);
      if (itemToDecrement) {
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalPrice -= itemToDecrement
          ? itemToDecrement.varietyList[0].discountPrice
          : 0;
      }
      console.log(state);
    })
    .addCase(CLEAR_CART, state => {
      state.items = [];
      state.totalPrice = 0;
    });
});
