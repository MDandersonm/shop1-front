import axios from "axios";
import { Action  } from "redux"; 
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';  
import { User, SIGN_IN, SignInPayload } from '../types/userTypes'; // userTypes.ts에서 타입들을 가져옵니다.
import mainRequest from "../../api/mainRequest";

export const signUp =
  (userData: User, navigate: (path: string) => void): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    try {
      console.log("signUp-try")

      const response = await mainRequest.post(
        "/user/sign-up",
        userData
      );
      alert('회원가입 성공');
      // if (getState().user.isLoggedIn) {
      // }
      navigate("/sign-in"); 
    } catch (error) {
      console.log("sign up실패!")
      console.error(error);
    }
  };

  export const signIn =
  (userData: SignInPayload): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    try {
      console.log("signIn- try")
      console.log("response로 들어가기전 userData:",userData)
      // const formBody = Object.keys(userData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(userData[key])).join('&');

      const response = await mainRequest.post(
        "/login",  // Change the endpoint to the sign in endpoint
        userData,
        // {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        // }
      );
      console.log("sigin in, response후 ")
      dispatch({
        type: SIGN_IN,
        payload: { 
          ...response.data, 
          isLoggedIn: true,
        },
      });
      
      console.log("response.data:",response.data);
      console.log("response:",response);
      console.log("response.headers:",response.headers);
      console.log("response.headers.getAuthorization:",response.headers.getAuthorization);
      console.log("response.headers.Authorization:",response.headers.Authorization);
      localStorage.setItem('token', response.data.token);
      alert('로그인 성공');
    //로그인 후 사용자정보 state에 넣기, 토큰이용한 검증
    } catch (error) {
      console.log("sign in 실패!")
      console.error(error);
    }
  };


