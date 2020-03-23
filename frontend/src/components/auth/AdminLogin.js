import React, { useState, useEffect } from "react";
import "../../style/login.css";
import { Link } from "react-router-dom";
import { adminLogin, logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const AdminLogin = props => {
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
    const data = { username, password };
    e.preventDefault();
    if (username && password) {
      dispatch(adminLogin(data, props.history));
    } else {
      setErrors({ username: "Please fill the values" });
    }
  };
  return (
    <div>
      <h1>The New Way Of Managing Your Health!</h1>
      <div class="cont">
        <div class="form">
          <form action="">
            <h1 className="form-heading">Admin Login</h1>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              class="user"
              placeholder="Username"
              required
            />
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              class="pass"
              placeholder="Password"
              required
            />
            {/* <input type="checkbox" />
            <label className="form-p"> Remember Me</label> */}
            <button class="register" onClick={onSubmit}>
              Login
            </button>
            <p style={{ color: "red", fontSize: "25px" }}>{error.username}</p>
            <p style={{ color: "red", fontSize: "25px" }}>
              {errors.adminLoginError
                ? errors.adminLoginError.data.message
                : ""}
            </p>
            {/* {console.log(errors)} */}
            <p className="form-p" style={{ marginTop: "30px" }}>
              <Link to="/" className="form-p">
                Not an Admin? Click here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminLogin);
