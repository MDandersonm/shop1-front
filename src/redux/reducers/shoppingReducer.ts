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
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.product.id !== action.payload.productId &&
            item.size !== action.payload.size
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
