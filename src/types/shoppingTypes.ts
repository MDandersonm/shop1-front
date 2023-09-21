import { IProduct } from "./productTypes";

declare global {
  interface Window {
    daum: any;
  }
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
};

// export type CartState = {
//   cart: any[];
//   singleItem: any;
//   checkoutFlow: 'cart'|'direct';
// };

export const GO_TO_CHECKOUT = "GO_TO_CHECKOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const RESET_CHECKOUT_FLOW = "RESET_CHECKOUT_FLOW";

export interface CartFormProps {
  isCheckout?: boolean; // 선택적 prop. 기본값은 false 입니다.
}
export interface ResetCheckoutFlowAction {
  type: typeof RESET_CHECKOUT_FLOW;
}
export interface GoToCheckoutAction {
  type: typeof GO_TO_CHECKOUT;
  payload: GoToCheckoutPayload
}
export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: AddToCartPayload
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

// 모든 액션 타입들을 결합합니다.
export type ShoppingCartActions =
  | ResetCheckoutFlowAction
  | GoToCheckoutAction
  | AddToCartAction
  | RemoveFromCartAction
  | IncrementQuantityAction
  | DecrementQuantityAction;
