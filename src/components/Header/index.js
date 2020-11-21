import React from "react";
import "./index.css";
import logo from "../../assets/Marvel-Comics-Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul>
          <Link to="/" className="link">
            <li>Characters</li>
          </Link>
          <Link to="/comics" className="link">
            <li>COMICS</li>
          </Link>
          <Link to="/myfavs" className="link">
            <li>FAV</li>
          </Link>
        </ul>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default Header;
