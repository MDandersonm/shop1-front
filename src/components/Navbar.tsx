import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-light mb-5">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <ul className="navbar-nav">
            <li className="nav-item mx-5" >
              <Link className="navbar-brand" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/product-list">
                축구화
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <NavLink className="nav-link" to="/ts1">
                회원가입
              </NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink className="nav-link " to="/ts1">
                로그인
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
