import mainRequest from "../../api/mainRequest";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import axios, { AxiosError } from "axios";
import {
  GO_TO_CHECKOUT,
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  RESET_CHECKOUT_FLOW,
  CLEAR_CART,
  FETCH_ORDERS,
  SELECT_ORDER,
  IOrderInfo,
  SelectOrderAction,
} from "../../types/shoppingTypes";
import { Dispatch } from "redux";
import { IProduct } from "../../types/productTypes";

export const resetCheckoutFlow = () => {
  return {
    type: RESET_CHECKOUT_FLOW,
  };
};
export const goToCheckOut = (
  userId: number,
  flow: string,
  product: IProduct,
  size: string
) => {
  return {
    type: GO_TO_CHECKOUT,
    payload: { flow, product, size, userId, quantity: 1 },
  };
};

export const addToCart = (
  userId: number,
  flow: string,
  product: IProduct,
  size: string
) => {
  return {
    type: ADD_TO_CART,
    payload: { userId, flow, product, size, quantity: 1 },
  };
};

export const removeFromCart = (
  userId: number,
  productId: number,
  size: string
) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { userId, productId, size },
  };
};

export const incrementQuantity = (
  userId: number,
  productId: number,
  size: string
) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: { userId, productId, size },
  };
};

export const decrementQuantity = (
  userId: number,
  productId: number,
  size: string
) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: { userId, productId, size },
  };
};
export const SAVE_ORDER_REQUEST = "SAVE_ORDER_REQUEST";
export const SAVE_ORDER_SUCCESS = "SAVE_ORDER_SUCCESS";
export const SAVE_ORDER_FAIL = "SAVE_ORDER_FAIL";

export const saveOrder = (orderInfo: any) => async (dispatch: any) => {
  console.log("saveOrder 진입");
  dispatch({ type: SAVE_ORDER_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await mainRequest.post("/orders/onlyuser/save", JSON.stringify(orderInfo), config);
    dispatch({ type: SAVE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SAVE_ORDER_FAIL, error: (error as Error).message });
  }
};

export const clearCart =(userId: number)  => {
    return {
        type: CLEAR_CART,
        payload: userId
    };
};
export const fetchOrders = () => async (dispatch:any) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    console.log("fetch order 진입")
    const response = await mainRequest.get("/orders/onlyuser/list",config);
    console.log("order response",response.data)
    dispatch({ type: FETCH_ORDERS, payload: response.data });
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
export const selectOrder = (order: IOrderInfo): SelectOrderAction => ({
  type: SELECT_ORDER,
  payload: order,
});




