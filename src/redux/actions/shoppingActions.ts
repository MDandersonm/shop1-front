import mainRequest from "../../api/mainRequest";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import axios, { AxiosError } from "axios";
import { GO_TO_CHECKOUT,ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART, RESET_CHECKOUT_FLOW } from "../types/shoppingTypes";
import { Dispatch } from "redux";
import { IProduct } from "../types/productTypes";

export const resetCheckoutFlow = () => {
  return {
    type: RESET_CHECKOUT_FLOW
  };
};
export const goToCheckOut = (flow:string,product: IProduct, size: string) => {
  return {
    type: GO_TO_CHECKOUT,
    payload: {flow, product, size, quantity: 1 }
  };
};

export const addToCart = (flow:string,product: IProduct, size: string) => {
  return {
    type: ADD_TO_CART,
    payload: {flow, product, size, quantity: 1 }
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
