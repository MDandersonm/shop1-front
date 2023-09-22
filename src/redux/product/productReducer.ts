import {
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
  ProductState,
  ProductActionTypes,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  WISHLIST_FETCH_REQUEST,
  WISHLIST_FETCH_SUCCESS,
  WISHLIST_FETCH_ERROR,
} from "../../types/productTypes";

const initialState: ProductState = {
  loading: false,
  product: null,
  products: [],
  error: null,
};

export const productReducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case SAVE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };
    case SAVE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.error };
    case DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ), // 삭제된 상품 제거
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case WISHLIST_FETCH_REQUEST:
      return { ...state, loading: true };
    case WISHLIST_FETCH_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case WISHLIST_FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
