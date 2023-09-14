// productTypes.ts

export interface IProduct {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
  }
  

 // Action Types
export const SAVE_PRODUCT_REQUEST = 'SAVE_PRODUCT_REQUEST';
export const SAVE_PRODUCT_SUCCESS = 'SAVE_PRODUCT_SUCCESS';
export const SAVE_PRODUCT_FAILURE = 'SAVE_PRODUCT_FAILURE';


export interface ProductState {
    loading: boolean;
    product: IProduct | null;
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
  
  export type ProductActionTypes = SaveProductRequestAction | SaveProductSuccessAction | SaveProductFailureAction;