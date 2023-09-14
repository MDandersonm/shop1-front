import mainRequest from "../../api/mainRequest";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import {
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
  ProductActionTypes,
  IProduct,
} from "../types/productTypes";
import axios, { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

export const saveProduct =
  (product: IProduct): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(saveProductRequest());
    try {
      const response = await mainRequest.post("/products/register", product);
      dispatch(saveProductSuccess(response.data));
      alert("상품 저장 성공");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError?.response?.data.message || "Unknown error";

      // dispatch(saveProductFailure(errorMessage));
      console.error(errorMessage);
      alert(errorMessage);
    }
  };

const saveProductRequest = (): ProductActionTypes => {
  return {
    type: SAVE_PRODUCT_REQUEST,
  };
};

const saveProductSuccess = (data: IProduct): ProductActionTypes => {
  return {
    type: SAVE_PRODUCT_SUCCESS,
    payload: data,
  };
};

const saveProductFailure = (error: string): ProductActionTypes => {
  return {
    type: SAVE_PRODUCT_FAILURE,
    payload: error,
  };
};
