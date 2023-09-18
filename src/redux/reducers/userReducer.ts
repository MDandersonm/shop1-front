import {
  UserState,
  UserActionTypes,
  SIGN_IN,
  LOGOUT,
  USER_INFO,
  LOGIN_SUCCESS,
} from "../types/userTypes"; // userTypes.ts에서 타입들을 가져옵니다.

// Initial State
const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

// Reducer
export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SIGN_IN: // Handle SIGN_IN action
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn || false,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
