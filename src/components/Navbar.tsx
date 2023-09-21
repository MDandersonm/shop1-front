import React, { useEffect } from "react";
import { useMatch, Link, NavLink, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ActiveNavLink from "./ActiveNavLink";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducers";
import { checkUser, logout } from "../redux/user/userActions";
import { AppDispatch } from "../index";
const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user); // 현재 사용자 정보 가져오기

  const [needAdminCheck, setNeedAdminCheck] = React.useState(false); // 관리자 확인 필요 여부를 저장

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logout());
  };
  const handleNavigateToCart = () => {
    dispatch({ type: "RESET_CHECKOUT_FLOW" });
    navigate("/cart");
  };

  useEffect(() => {
    console.log("navbar useEffect 작동");
    console.log("needAdminCheck", needAdminCheck);
    if (needAdminCheck) {
      console.log("user?.role", user?.role);
      if (user?.role !== "ROLE_ADMIN") {
        alert("관리자만 접근 가능합니다.");
      }
      setNeedAdminCheck(false); // 관리자 확인 작업이 끝났으므로 다시 false로 설정
    }
  }, [user, needAdminCheck]);

  const handleProductRegisterClick = async (event: React.MouseEvent) => {
    await dispatch(checkUser()); // checkUser 액션을 디스패치하여 사용자 정보를 갱신
    setNeedAdminCheck(true); // 관리자 확인이 필요하므로 true로 설정
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
            <li className="nav-item mx-5" style={{ width: "100px" }}>
              <ActiveNavLink
                to="/product-register"
                activeClassName="active-link"
                className="nav-link"
                onClick={handleProductRegisterClick}
              >
                <span className="h5" style={{ fontWeight: "bold" }}>
                  상품등록
                </span>
              </ActiveNavLink>
            </li>
            <li className="nav-item mx-5" style={{ width: "100px" }}>
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
            {/* <li className="nav-item mx-5">
              <NavLink className="nav-link" to="/userOnly/product-test">
                <span className="h5" style={{ fontWeight: "bold" }}>
                  테스트
                </span>
              </NavLink>
            </li> */}
          </ul>

          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item" style={{ width: "150px" }}>
              {/* <NavLink
                className="nav-link  d-flex align-items-center"
                to="/sign-up"
              >
                <PersonAddIcon className="mx-2" />
                <span className="">회원가입</span>
              </NavLink> */}
              {isLoggedIn ? (
                <ActiveNavLink
                  onClick={handleNavigateToCart}
                  className="nav-link"
                  activeClassName="active-link"
                  to="/cart"
                >
                  <div className="d-flex align-items-center">
                    <ShoppingCartIcon className="mx-2" />
                    <span className="">장바구니</span>
                  </div>
                </ActiveNavLink>
              ) : (
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
              )}
            </li>
            <li className="nav-item mx-5" style={{ width: "150px" }}>
              {isLoggedIn ? (
                // 로그인 상태일 경우, 로그아웃 버튼을 보여줍니다.

                // <ActiveNavLink
                //   onClick={handleLogout}
                //   className="nav-link"
                //   activeClassName="active-link"
                //   to="/sign-out"
                // >
                //   <div className="d-flex align-items-center">
                //     <ExitToAppIcon className="mx-2" />
                //     <span className="">로그아웃</span>
                //   </div>
                // </ActiveNavLink>
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
