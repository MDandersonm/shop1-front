import React from "react";
import { useMatch, Link, NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ActiveNavLink from "./ActiveNavLink";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducers";
import { logout } from "../redux/actions/userActions";
import { AppDispatch } from '../index';
const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault(); // 버튼의 기본 동작인 폼 제출을 막습니다.
    dispatch(logout()); // 로그아웃 액션을 디스패치합니다.
  };
  return (
    <nav
      className="navbar navbar-custom"
      style={{ height: "100px", minWidth: "800px" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-5">
              <Link className="navbar-brand" to="/">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  style={{ width: "100px" }}
                />
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav  d-flex flex-row">
            <li className="nav-item">
              <ActiveNavLink
                to="/product-list"
                activeClassName="active-link"
                className="nav-link"
              >
                <span className="h5" style={{ fontWeight: "bold" }}>
                  축구화
                </span>
              </ActiveNavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink className="nav-link" to="/userOnly/product-test">
                <span className="h5" style={{ fontWeight: "bold" }}>
                  테스트
                </span>
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              {/* <NavLink
                className="nav-link  d-flex align-items-center"
                to="/sign-up"
              >
                <PersonAddIcon className="mx-2" />
                <span className="">회원가입</span>
              </NavLink> */}
              <ActiveNavLink
                className="nav-link"
                activeClassName="active-link"
                to="/sign-up"
              >
                <div className="d-flex align-items-center">
                  <PersonAddIcon className="mx-2" />
                  <span className="">회원가입</span>
                </div>
              </ActiveNavLink>
            </li>
            <li className="nav-item mx-5">
              {isLoggedIn ? (
                // 로그인 상태일 경우, 로그아웃 버튼을 보여줍니다.
                <button
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center"
                >
                  <ExitToAppIcon className="mx-2" />
                  <span>로그아웃</span>
                </button>
              ) : (
                // 로그인 상태가 아닐 경우, 로그인 버튼을 보여줍니다.
                <ActiveNavLink
                  className="nav-link"
                  activeClassName="active-link"
                  to="/sign-in"
                >
                  <div className="d-flex align-items-center">
                    <ExitToAppIcon className="mx-2" />
                    <span className="">로그인</span>
                  </div>
                </ActiveNavLink>
              )}

              {/* <NavLink
                className="nav-link  d-flex align-items-center"
                to="/sign-in"
              >
                <ExitToAppIcon className="mx-2" />
                <span className="">로그인</span>
              </NavLink> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
