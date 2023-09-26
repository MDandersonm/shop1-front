import {
  ADD_TO_CART,
  CLEAR_CART,
  CartState,
  DECREMENT_QUANTITY,
  GO_TO_CHECKOUT,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  RESET_CHECKOUT_FLOW,
  ShoppingCartActions,
} from "../../types/shoppingTypes";
import {
  SAVE_ORDER_FAIL,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
} from "./shoppingActions";

const initialState: CartState = {
  cart: [],
  singleItem: null,
  checkoutFlow: "cart",
  loading: false,
  data: null,
  error: null,
};

export const shoppingReducer = (
  state = initialState,
  action: ShoppingCartActions
): CartState => {
  switch (action.type) {
    case RESET_CHECKOUT_FLOW:
      return {
        ...state,
        checkoutFlow: "cart",
      };

    case GO_TO_CHECKOUT:
      return {
        ...state,
        singleItem: action.payload,
        checkoutFlow: action.payload.flow,
      };

    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        (item) =>
          item.userId === action.payload.userId &&
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
          checkoutFlow: action.payload.flow,
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
              item.userId === action.payload.userId &&
              item.product.id === action.payload.productId &&
              item.size === action.payload.size
            )
        ),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.userId === action.payload.userId &&
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
          item.userId === action.payload.userId &&
          item.product.id === action.payload.productId &&
          item.size === action.payload.size &&
          item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case SAVE_ORDER_REQUEST:
      return { ...state, loading: true };
    case SAVE_ORDER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SAVE_ORDER_FAIL:
      return { ...state, loading: false, error: action.error };

    case CLEAR_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.userId !== action.payload)
      };
    default:
      return state;
  }
};
