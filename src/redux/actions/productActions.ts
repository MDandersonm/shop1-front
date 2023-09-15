import mainRequest from "../../api/mainRequest";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
  ProductActionTypes,
  IProduct,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "../types/productTypes";
import axios, { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

export const saveProduct =
  (
    product: IProduct,
    imageFile: File | null,
    detailImageFiles: File[],
    navigate: (path: string) => void
  ) =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (detailImageFiles.length !==0) {
        console.log("detailImageFiles",detailImageFiles)
        detailImageFiles.forEach((file, index) => {
          formData.append("detailImages", file);
        });
      }
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        })
      );

      const response = await mainRequest.post("/products/register", formData);

      if (response.status !== 200) {
        throw new Error("상품 저장 실패");
      }

      const data = response.data; // axios는 자동으로 JSON을 파싱
      console.log(data);
      navigate("/product-list");
    } catch (error) {
      console.error("상품 저장 중 오류:", error);
    }
  };

// export const saveProduct =
//   (product: IProduct): ThunkAction<void, RootState, unknown, Action<string>> =>
//   async (dispatch) => {
//     dispatch(saveProductRequest());
//     try {
//       const response = await mainRequest.post("/products/register", product);
//       dispatch(saveProductSuccess(response.data));
//       alert("상품 저장 성공");
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       const errorMessage =
//         axiosError?.response?.data.message || "Unknown error";

//       // dispatch(saveProductFailure(errorMessage));
//       console.error(errorMessage);
//       alert(errorMessage);
//     }
//   };

// const saveProductRequest = (): ProductActionTypes => {
//   return {
//     type: SAVE_PRODUCT_REQUEST,
//   };
// };

// const saveProductSuccess = (data: IProduct): ProductActionTypes => {
//   return {
//     type: SAVE_PRODUCT_SUCCESS,
//     payload: data,
//   };
// };

// const saveProductFailure = (error: string): ProductActionTypes => {
//   return {
//     type: SAVE_PRODUCT_FAILURE,
//     payload: error,
//   };
// };

// Thunk action
export const fetchProducts = () => {
  return (dispatch: any) => {
    dispatch(fetchProductsRequest());
    mainRequest
      .get("/products/list")
      .then((response) => {
        dispatch(fetchProductsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};
export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = (products: IProduct[]) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFailure = (error: string) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProduct =
  (
    productId: number
  ): ThunkAction<void, RootState, unknown, ProductActionTypes> =>
  async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    try {
      const response = await mainRequest.get(`/products/detail/${productId}`);
      console.log("response.data",response.data)
      console.log("response.data.detailImages",response.data.detailImages[0])
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      const err = error as Error;
      dispatch({ type: FETCH_PRODUCT_FAILURE, error: err.message });
    }
  };
