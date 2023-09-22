export interface IProductDetailImage {
  detailImageUrl: string;
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  image?: string;
  detailImages?: IProductDetailImage[];
}

// export interface IProductFormState extends Omit<IProduct, 'price'> {
//   price: string;
// }

// Action Types
export const SAVE_PRODUCT_REQUEST = "SAVE_PRODUCT_REQUEST";
export const SAVE_PRODUCT_SUCCESS = "SAVE_PRODUCT_SUCCESS";
export const SAVE_PRODUCT_FAILURE = "SAVE_PRODUCT_FAILURE";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const FETCH_PRODUCT_REQUEST = "FETCH_PRODUCT_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const WISHLIST_FETCH_REQUEST = "WISHLIST_FETCH_REQUEST";
export const WISHLIST_FETCH_SUCCESS = "WISHLIST_FETCH_SUCCESS";
export const WISHLIST_FETCH_ERROR = "WISHLIST_FETCH_ERROR";
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
};

type FetchProductsSuccessAction = {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: IProduct[];
};

type FetchProductsFailureAction = {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string;
};

interface FetchProductRequestAction {
  type: typeof FETCH_PRODUCT_REQUEST;
}

interface FetchProductSuccessAction {
  type: typeof FETCH_PRODUCT_SUCCESS;
  payload: IProduct;
}

interface FetchProductFailureAction {
  type: typeof FETCH_PRODUCT_FAILURE;
  error: string;
}
interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
}
interface DeleteProductSuccessAction {
  type: typeof DELETE_PRODUCT_SUCCESS;
  payload: number;
}

interface DeleteProductFailtureAction {
  type: typeof DELETE_PRODUCT_FAILURE;
  error: string;
}

interface FetchWishlistRequestAction {
  type: typeof WISHLIST_FETCH_REQUEST;
}

interface FetchWishlistSuccessAction {
  type: typeof WISHLIST_FETCH_SUCCESS;
  payload: IProduct[]; 
}

interface FetchWishlistErrorAction {
  type: typeof WISHLIST_FETCH_ERROR;
  payload: string;
}

export type ProductActionTypes =
  | FetchWishlistRequestAction
  | FetchWishlistErrorAction
  | FetchWishlistSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | DeleteProductFailtureAction
  | SaveProductRequestAction
  | SaveProductSuccessAction
  | SaveProductFailureAction
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | FetchProductRequestAction
  | FetchProductSuccessAction
  | FetchProductFailureAction;
