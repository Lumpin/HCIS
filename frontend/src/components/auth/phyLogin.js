import React, { useState, useEffect } from "react";
import "../../style/login.css";
import { Link, withRouter } from "react-router-dom";
import { physicianLogin, logoutUser } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";

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
    const data = { username, password };
    if (username && password) {
      dispatch(physicianLogin(data, props.history));
    } else {
      setErrors({ username: "Please fill the values" });
    }
  };
  return (
    <div>
      <h1>The New Way Of Managing Your Health!</h1>
      <div className="cont">
        <div className="form">
          <form action="">
            <h1 className="form-heading">Physician Login</h1>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              className="user"
              placeholder="ID"
              required
            />
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="pass"
              placeholder="Password"
              required
            />

            <button className="register" onClick={onSubmit}>
              Login
            </button>
            <p style={{ color: "red", fontSize: "25px" }}>{error.username}</p>
            <p style={{ color: "red", fontSize: "25px" }}>
              {errors.physicianLoginError
                ? errors.physicianLoginError.data.message
                : ""}
            </p>
            <p className="form-p">
              <Link className="form-p">Dont know your ID? Click here</Link>
            </p>
            <p className="form-p">
              <Link className="form-p" to="/patient/login">
                Not a physician? Click here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
