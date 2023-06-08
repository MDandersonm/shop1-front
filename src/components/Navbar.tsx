import React from "react";
import { Link, NavLink } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
              <NavLink className="nav-link  d-flex align-items-center" to="/sign-up">
              <PersonAddIcon className="mx-2"/><span className="">회원가입</span>
              </NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink className="nav-link  d-flex align-items-center" to="/ts1">
              <ExitToAppIcon className="mx-2"/><span className="">로그인</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
