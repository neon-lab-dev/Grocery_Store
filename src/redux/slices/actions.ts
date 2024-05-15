import {
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  REMOVE_ITEM,
} from './actionTypes';
import {Item} from './index';

export const addToCart = (item: Item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const incrementItem = (itemId: string) => ({
  type: INCREMENT_ITEM,
  payload: itemId,
});

export const decrementItem = (itemId: string) => ({
  type: DECREMENT_ITEM,
  payload: itemId,
});
export const removeItem = (itemId: string) => ({
  type: REMOVE_ITEM,
  payload: itemId,
});
export const clearCart = () => ({
  type: CLEAR_CART,
});
