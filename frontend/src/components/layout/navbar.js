import React from "react";
import "../../style/navbar.css";
import { Link, withRouter } from "react-router-dom";
import { useDispatch  } from "react-redux";
import {  logoutUser } from "../../actions/index"

const Nav = (props) => {
const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logoutUser(props.history));
  }
  return (
    <div className="topnav">
      <Link className="active" to="/">
        HCIS
      </Link>
      <div className="topnav-right">
        <Link className="link" to="/patient/register">
        {!localStorage.jwtToken ? "Register": ""}
        </Link>
        <Link className="link" to="/patient/login">
          {!localStorage.jwtToken ? "Login": ""}
        </Link>
        <Link className="link" onClick={onLogoutClick}>
          {localStorage.jwtToken ? "Logout": ""}
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Nav);
