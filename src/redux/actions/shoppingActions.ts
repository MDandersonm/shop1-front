import mainRequest from "../../api/mainRequest";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import axios, { AxiosError } from "axios";
import { ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART } from "../types/shoppingTypes";
import { Dispatch } from "redux";


export const addToCart = (product: any, size: string) => {
  return {
    type: ADD_TO_CART,
    payload: { product, size, quantity: 1 }
  };
};

export const removeFromCart = (productId: string,size: string) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { productId, size }
  };
};

export const incrementQuantity = (productId: string,size: string) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: { productId, size }
  };
};

export const decrementQuantity = (productId: string,size: string) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: { productId, size }
  };
};
