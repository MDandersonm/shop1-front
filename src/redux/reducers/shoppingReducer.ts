import {
  ADD_TO_CART,
  CartState,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  ShoppingCartActions,
} from "../types/shoppingTypes";

const initialState: CartState = {
  cart: [],
};

export const shoppingReducer = (
  state = initialState,
  action: ShoppingCartActions
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size
      );

      // 동일한 상품이 이미 있는 경우
      if (existingProductIndex !== -1) {
        const updatedItem = {
          ...state.cart[existingProductIndex],
          quantity: state.cart[existingProductIndex].quantity + 1,
        };

        return {
          ...state,
          cart: [
            ...state.cart.slice(0, existingProductIndex),
            updatedItem,
            ...state.cart.slice(existingProductIndex + 1),
          ],
        };
      }
      // 새로운 상품 추가
      else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.size === action.payload.size
            )
        ),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size &&
          item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};
