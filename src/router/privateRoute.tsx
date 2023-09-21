import React, { useEffect, Dispatch } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkUser } from "../redux/user/userActions";

const PrivateRoute: React.FC<any> = ({ children, allowedRoles }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  useEffect(() => {
    // checkUser 액션을 디스패치
    dispatch(checkUser());
  }, [dispatch]);

  if (!user) {
    //user가 없을때(비회원일때)
    console.log("user", user);
    return <Navigate to="/sign-in" replace />; //repalce넣어서 뒤로가기안되는 문제 해결
  } else if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("user", user);
    return (
      <div
        style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}
      >
        Access Denied
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
