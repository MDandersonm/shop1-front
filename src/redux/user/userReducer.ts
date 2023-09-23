import {
  UserState,
  UserActionTypes,
  SIGN_IN,
  LOGOUT,
  USER_INFO,
  LOGIN_SUCCESS,
  USERNAME_DUPLICATED,
  USERNAME_NOT_DUPLICATED,
} from "../../types/userTypes"; 

// Initial State
const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  isNickNameDuplicated: false,
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
    case USERNAME_DUPLICATED:
      return {
        ...state,
        isNickNameDuplicated: true,
      };
    case USERNAME_NOT_DUPLICATED:
      return {
        ...state,
        isNickNameDuplicated: false,
      };
    default:
      return state;
  }
};
