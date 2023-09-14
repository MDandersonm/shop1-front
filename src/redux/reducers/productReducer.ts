import {
    SAVE_PRODUCT_REQUEST,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_FAILURE,
    ProductState,
    ProductActionTypes
  } from '../types/productTypes';
  
  const initialState: ProductState = {
    loading: false,
    product: null,
    error: null
  };
  
  const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
      case SAVE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        };
      case SAVE_PRODUCT_SUCCESS:
        return {
          loading: false,
          product: action.payload,
          error: null
        };
      case SAVE_PRODUCT_FAILURE:
        return {
          loading: false,
          product: null,
          error: action.payload
        };
      default: return state;
    }
  };
  
  export default productReducer;
  