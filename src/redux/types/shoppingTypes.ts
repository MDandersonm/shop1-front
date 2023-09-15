export type CartState = {
  cart: any[];
};
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: { product: any; size: string };
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: { productId: string; size: string };
}

export interface IncrementQuantityAction {
  type: typeof INCREMENT_QUANTITY;
  payload: { productId: string; size: string };
}

export interface DecrementQuantityAction {
  type: typeof DECREMENT_QUANTITY;
  payload: { productId: string; size: string };
}

// 모든 액션 타입들을 결합합니다.
export type ShoppingCartActions =
  | AddToCartAction
  | RemoveFromCartAction
  | IncrementQuantityAction
  | DecrementQuantityAction;
