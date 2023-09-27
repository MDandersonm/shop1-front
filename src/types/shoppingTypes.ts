import { IProduct } from "./productTypes";
import { User } from "./userTypes";

declare global {
  interface Window {
    daum: any;
  }
}
export interface OrderCardProps {
  order: IOrderInfo;
  onCardClick: (order: IOrderInfo) => void;
  formatNumber: (num: number) => string;
  showDeliveryInfo?: boolean; 
}

export interface CartItem {
  userId: number;
  product: IProduct;
  size: string;
  quantity: number;
}
export interface GoToCheckoutPayload {
  flow: "cart" | "direct";
  product: IProduct;
  size: string;
  userId: number;
  quantity: number;
}

export interface AddToCartPayload extends CartItem {
  flow: "cart" | "direct";
}

export type CartState = {
  cart: CartItem[];
  singleItem: CartItem | null;
  checkoutFlow: "cart" | "direct";
  loading: boolean;
  data: any;
  error: string | null;
  orders: IOrderInfo[];
  selectedOrder?: IOrderInfo;
};

// export type CartState = {
//   cart: any[];
//   singleItem: any;
//   checkoutFlow: 'cart'|'direct';
// };

export interface IOrderProduct {
  id: number;
  product: IProduct;
  quantity: number;
  size: string;
  price: number;
}

export interface IOrderInfo {
  id: number;
  user: {
    id: number;
  };
  totalPrice: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  phone: string;
  orderDate: Date;
  orderProducts: IOrderProduct[];
}
export const GO_TO_CHECKOUT = "GO_TO_CHECKOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const RESET_CHECKOUT_FLOW = "RESET_CHECKOUT_FLOW";
export const SAVE_ORDER_REQUEST = "SAVE_ORDER_REQUEST";
export const SAVE_ORDER_SUCCESS = "SAVE_ORDER_SUCCESS";
export const SAVE_ORDER_FAIL = "SAVE_ORDER_FAIL";
export const CLEAR_CART = "CLEAR_CART";
export const FETCH_ORDERS = "FETCH_ORDERS";
export const SELECT_ORDER = "SELECT_ORDER";

export interface SelectOrderAction {
  type: typeof SELECT_ORDER;
  payload: IOrderInfo;
}

export interface CartFormProps {
  isCheckout?: boolean; // 선택적 prop. 기본값은 false 입니다.
  setTotalPrice?: (price: number) => void;
  setUser?: (user: User) => void;
  updateItems?: (items: CartItem[]) => void;
}

export interface CheckoutFormProps {
  user?: User;
  items?: CartItem[];
}
export interface ResetCheckoutFlowAction {
  type: typeof RESET_CHECKOUT_FLOW;
}
export interface GoToCheckoutAction {
  type: typeof GO_TO_CHECKOUT;
  payload: GoToCheckoutPayload;
}
export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: AddToCartPayload;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: { userId: number; productId: number; size: string };
}

export interface IncrementQuantityAction {
  type: typeof INCREMENT_QUANTITY;
  payload: { userId: number; productId: number; size: string };
}

export interface DecrementQuantityAction {
  type: typeof DECREMENT_QUANTITY;
  payload: { userId: number; productId: number; size: string };
}

export interface SaveOrderRequestAction {
  type: typeof SAVE_ORDER_REQUEST;
}

export interface SaveOrderSuccessAction {
  type: typeof SAVE_ORDER_SUCCESS;
  payload: any;
}

export interface SaveOrderFailAction {
  type: typeof SAVE_ORDER_FAIL;
  error: string;
}
export interface ClearCartAction {
  type: typeof CLEAR_CART;
  payload: number;
}
export interface FetchOrdersAction {
  type: typeof FETCH_ORDERS;
  payload: IOrderInfo[];
}
export type ShoppingCartActions =
  | ResetCheckoutFlowAction
  | GoToCheckoutAction
  | AddToCartAction
  | RemoveFromCartAction
  | IncrementQuantityAction
  | DecrementQuantityAction
  | SaveOrderRequestAction
  | SaveOrderSuccessAction
  | SaveOrderFailAction
  | ClearCartAction
  | FetchOrdersAction
  | SelectOrderAction;
