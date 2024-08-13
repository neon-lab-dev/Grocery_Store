import {createReducer} from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  REMOVE_ITEM,
  FETCH_CART,
} from './actionTypes';
import {CartItem} from './index';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const newItem = action.payload as CartItem;
      const existingItem = state.items.find(
        item =>
          item.varietyId === newItem.varietyId &&
          item.varietyList[0].value === newItem.varietyList[0].value,
      );
      if (existingItem) {
        existingItem.boughtQuantity += newItem.boughtQuantity;
      } else {
        state.items.push(newItem);
      }
      // No need to update totalPrice here
    })
    .addCase(INCREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToIncrement = state.items.find(
        item => item.varietyId === itemId,
      );
      if (itemToIncrement) {
        itemToIncrement.boughtQuantity++;
        // No need to update totalPrice here
      }
    })
    .addCase(DECREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToDecrement = state.items.find(
        item => item.varietyId === itemId,
      );
      if (itemToDecrement && itemToDecrement.boughtQuantity >= 1) {
        itemToDecrement.boughtQuantity--;
        // No need to update totalPrice here
      }
    })
    .addCase(REMOVE_ITEM, (state, action) => {
      const itemId = action.payload as number;
      state.items = state.items.filter(item => item.varietyId !== itemId);
      // No need to update totalPrice here
    })
    .addCase(CLEAR_CART, state => {
      state.items = [];
      // No need to update totalPrice here
    })
    .addCase(FETCH_CART, (state, action) => {
      const items = action.payload;
      state.items = items;
      // No need to update totalPrice here
    });
});
