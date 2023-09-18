// User shape 정의
export interface User {
    email: string;
    password: string;// 실제 상황에서는 비밀번호를 state에 저장하지 않는 것이 좋음
    username?: string;
    role?: string;
    provider?: string;
    providerId?: string;
    createDate?: Date;
  }



  export interface SignInPayload {
    // [key: string]: string;
    email: string;
    password: string;
    isLoggedIn?: boolean; 
  }
  
  
  // Action Types
  export const SIGN_IN = "user/SIGN_IN";
  export const LOGOUT="LOGOUT";
  export const USER_INFO="USER_INFO";

  export interface SignInAction {
    type: typeof SIGN_IN;
    payload: SignInPayload;
  }
  

export interface LogoutAction {
  type: typeof LOGOUT;
}
  /*
type: 이 프로퍼티는 액션의 타입을 나타내며,
여기서는 typeof SIGN_IN이라는 특정 문자열 값이어야 합니다.
여기서 SIGN_IN은 액션 타입을 구분하는 데 사용되는 상수입니다.
payload: 이 프로퍼티는 액션에 대한 추가 정보를 나타냅니다.
SignInPayload 타입의 객체가 됩니다.
  */
export interface UserInfoAction {
  type: typeof USER_INFO;
  payload: User;
}
  
  export type UserActionTypes =  SignInAction  | LogoutAction | UserInfoAction ;  // If you have other actions, you can add them here using a pipe ('|')
  
  // State Type
  export interface UserState {
    isLoggedIn: boolean; 
    user: null | User;
  }

  