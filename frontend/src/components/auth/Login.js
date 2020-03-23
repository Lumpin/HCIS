import React, { useState, useEffect } from "react";
import "../../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { patientLogin, logoutUser } from "../../actions/index";

import { Link, withRouter } from "react-router-dom";

const Login = props => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.jwtToken && localStorage.getItem("userRole") === "ADMIN") {
      props.history.push("/admin/panel");
    } else if (
      localStorage.jwtToken &&
      localStorage.getItem("userRole") === "PHYSICIAN"
    ) {
      props.history.push("/physician/profile");
    } else if (
      localStorage.jwtToken &&
      localStorage.getItem("userRole") === "PATIENT"
    ) {
      props.history.push("/patient/profile");
    } else if (localStorage.jwtToken) {
      dispatch(logoutUser(props.history));
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      username,
      password
    };
    if (username && password) {
      dispatch(patientLogin(data, props.history));
    } else {
      setErrors({ username: "Please fill the values" });
    }
    // console.log(data);
  };
  return (
    <div>
      <h1>The New Way Of Managing Your Health!</h1>
      <div className="cont">
        <div className="form">
          <form action="">
            <h1 className="form-heading"> Patient Login</h1>
            <input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              className="user"
              placeholder="Username"
            />
            <input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="pass"
              placeholder="Password"
            />
            <button className="login" onClick={onSubmit}>
              Login
            </button>
            <label className="form-p">No Account yet? {"  "}</label>
            <Link to="/patient/register">
              <button className="register-button">Register Now</button>
            </Link>
            <p style={{ color: "red", fontSize: "25px" }}>{error.username}</p>
            <p style={{ color: "red", fontSize: "25px" }}>
              {errors.patientLoginError
                ? errors.patientLoginError.data.message
                : ""}
            </p>
            <p className="form-p">
              <Link className="form-p" to="/physician/login">
                Are you a physician? Click here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
