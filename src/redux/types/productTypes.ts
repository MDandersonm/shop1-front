export interface IProduct {
    id: number;
    name: string;
    brand: string;
    price: string;
    image?:string;
  }
  

 // Action Types
export const SAVE_PRODUCT_REQUEST = 'SAVE_PRODUCT_REQUEST';
export const SAVE_PRODUCT_SUCCESS = 'SAVE_PRODUCT_SUCCESS';
export const SAVE_PRODUCT_FAILURE = 'SAVE_PRODUCT_FAILURE';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export interface ProductState {
    loading: boolean;
    product: IProduct | null;
    products: IProduct[]; 
    error: string | null;
  }
  
  interface SaveProductRequestAction {
    type: typeof SAVE_PRODUCT_REQUEST;
  }
  
  interface SaveProductSuccessAction {
    type: typeof SAVE_PRODUCT_SUCCESS;
    payload: IProduct;
  }
  
  interface SaveProductFailureAction {
    type: typeof SAVE_PRODUCT_FAILURE;
    payload: string;
  }
  type FetchProductsRequestAction = {
    type: typeof FETCH_PRODUCTS_REQUEST;
}

type FetchProductsSuccessAction = {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: IProduct[];
}

type FetchProductsFailureAction = {
    type: typeof FETCH_PRODUCTS_FAILURE;
    payload: string;
}
export type ProductActionTypes = 
    | SaveProductRequestAction
    | SaveProductSuccessAction
    | SaveProductFailureAction
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction;