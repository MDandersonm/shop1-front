import mainRequest from "../../api/mainRequest";
import { toast } from "react-toastify";
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
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "../../types/productTypes";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "@/index";

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
      if (detailImageFiles.length !== 0) {
        console.log("detailImageFiles", detailImageFiles);
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
      const config = {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await mainRequest.post(
        "/products/onlyadmin/register",
        formData,
        config
      );

      if (response.status !== 200) {
        throw new Error("상품 저장 실패");
      }

      const data = response.data; // axios는 자동으로 JSON을 파싱
      console.log(data);
      toast.success("상품이 저장되었습니다!");
      navigate("/product-list");
    } catch (error) {
      console.error("상품 저장 중 오류:", error);
      toast.error("상품 저장 중 오류 발생!");
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
      console.log("response.data", response.data);
      console.log("response.data.detailImages", response.data.detailImages[0]);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      const err = error as Error;
      dispatch({ type: FETCH_PRODUCT_FAILURE, error: err.message });
    }
  };

export const updateProduct =
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
      if (detailImageFiles.length !== 0) {
        console.log("detailImageFiles", detailImageFiles);
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

      const config = {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await mainRequest.put(
        `/products/onlyadmin/update/${product.id}`,
        formData,
        config
      );

      if (response.status !== 200) {
        throw new Error("상품 저장 실패");
      }

      const data = response.data; // axios는 자동으로 JSON을 파싱
      console.log(data);
      toast.success("상품정보가 수정되었습니다!");
      navigate("/product-list");
    } catch (error) {
      console.error("상품 수정 중 오류:", error);
      toast.error("상품 수정 중 오류 발생!");
    }
  };

export const deleteProduct =
  (
    productId: number
  ): ThunkAction<Promise<void>, RootState, unknown, ProductActionTypes> => // 반환 타입 변경
  (dispatch) => {
    return new Promise<void>(async (resolve, reject) => {
      dispatch({ type: DELETE_PRODUCT });

      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        await mainRequest.delete(
          `/products/onlyadmin/delete/${productId}`,
          config
        );
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
        toast.success("삭제되었습니다!");
        resolve();
      } catch (error) {
        const err = error as Error;
        dispatch({ type: DELETE_PRODUCT_FAILURE, error: err.message });
        toast.error("상품 삭제에 실패하였습니다!");
        reject(error);
      }
    });
  };

type MyThunkAction = ThunkAction<Promise<any>, RootState, undefined, AnyAction>;

export const toggleWishlist = (
  userId: number,
  productId: number
): MyThunkAction => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await mainRequest.post(
        `/wishlist/onlyuser/toggle/${userId}/${productId}`,'',
        config
      );

      if (response.status === 201) {
        toast.success("관심상품에 추가되었습니다!");
        return true;
      } else if (response.status === 204) {
        toast.success("관심상품에서 제거되었습니다!");
        return false;
      }

      return null;
    } catch (error: any) {
      console.log("error.response ", error.response);
      console.log("error.response.data ", error.response.data);
      console.log("error.response.data.message ", error.response.data.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("서버에서 오류가 발생했습니다.");
      }
    }
  };
};

export const fetchWishlistProducts = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: "PRODUCTS_FETCH_REQUEST" });

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await mainRequest.get(
        `/wishlist/onlyuser/list/${userId}`,
        config
      );

      dispatch({
        type: "WISHLIST_FETCH_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "WISHLIST_FETCH_ERROR",
        payload: (error as Error).message,
      });
    }
  };
};
export const checkWishlist = async (userId: number, productId: number) => {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const response = await mainRequest.get(
      `/wishlist/onlyuser/check/${userId}/${productId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("관심상품 확인 오류:", error);
  }
};
