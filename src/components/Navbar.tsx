import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar :React.FC = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="">
        <Link className="navbar-brand" to="/main">
          Home
        </Link>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/ts1">
              CodingNuNa
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
