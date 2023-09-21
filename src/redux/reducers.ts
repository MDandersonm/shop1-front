import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/userReducer';
import { productReducer } from './product/productReducer';
import { shoppingReducer } from './shopping/shoppingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  product:productReducer,
  shopping:shoppingReducer
  // other reducers can go here
});

export type RootState = ReturnType<typeof rootReducer>;
/*
TypeScript의 ReturnType은 함수의 반환 타입을 가져올 때 사용됩니다. 
즉, ReturnType<typeof rootReducer>는 rootReducer 함수의 반환 값을 추론하는 데 사용되며,
이를 RootState 타입으로 선언하고 있습니다.
그러므로 RootState 타입은 rootReducer가 반환하는 스테이트의 타입을 나타냅니다.
이를 통해 스토어의 전체 상태에 대한 타입을 지정할 수 있게 됩니다.
*/

export default rootReducer;
