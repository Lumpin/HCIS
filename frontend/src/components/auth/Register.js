import React, { useState, useEffect } from "react";
import "../../style/login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patientRegister, logoutUser } from "../../actions/index";
import { withRouter } from "react-router-dom";

const Register = props => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({});

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
    if (!(password === password2)) {
      setError({ password2: "Passwords do not match" });
    } else if (!(username && password && password2)) {
      setError({ all: "Please fill the values" });
    } else {
      const data = {
        username,
        password
      };
      setError({});
      dispatch(patientRegister(data, props.history));
    }
  };
  return (
    <div>
      <h1>The New Way Of Managing Your Health!</h1>
      <div class="cont">
        <div class="form">
          <form action="">
            <h1 className="form-heading">Create Your Account</h1>
            <input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              class="user"
              placeholder="Username"
            />

            <input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              class="pass"
              placeholder="Password"
            />
            <input
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              type="password"
              class="pass"
              placeholder="Confirm Password"
            />

            <p style={{ color: "red", fontSize: "20px" }}>{error.password2}</p>
            <button class="register" onClick={onSubmit}>
              Register
            </button>
            <p style={{ color: "red", fontSize: "20px" }}>{error.all}</p>
            <p style={{ color: "red", fontSize: "20px" }}>
              {errors.patientRegisterError
                ? errors.patientRegisterError.data.message
                : ""}
            </p>
            <p className="form-p">
              <Link className="form-p" to="/physician/login">
                Not a patient? Click here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
