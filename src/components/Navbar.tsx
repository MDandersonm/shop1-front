import React from "react";
import { useMatch, Link, NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ActiveNavLink from "./ActiveNavLink";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-custom" style={{ height: "100px" }}>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <ActiveNavLink
                to="/product-list"
                activeClassName="active-link"
                className="nav-link"
              >
                <span className="h5">축구화</span>
              </ActiveNavLink>
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
              {/* <NavLink
                className="nav-link  d-flex align-items-center"
                to="/sign-in"
              >
                <ExitToAppIcon className="mx-2" />
                <span className="">로그인</span>
              </NavLink> */}
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
