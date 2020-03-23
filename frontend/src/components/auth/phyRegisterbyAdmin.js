import React, { useState, useEffect } from "react";
import "../../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { physicianRegister, logoutUser } from "../../actions/index";
import { withRouter } from "react-router-dom";

const PhyRegisterByAdmin = props => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});

  useEffect(() => {
    if (
      !(localStorage.jwtToken && localStorage.getItem("userRole") === "ADMIN")
    ) {
      dispatch(logoutUser(props.history));
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const data = { username, password };
    if (username && password) {
      dispatch(physicianRegister(data, props.history));
    } else {
      setErrors({ username: "Please fill the values" });
    }
  };

  return (
    <div>
      <h1>Welcome to Admin!</h1>
      <div className="cont">
        <div className="form">
          <form action="">
            <h1 className="form-heading">Register Physician</h1>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              className="user"
              placeholder="Enter the Physician ID"
              required
            />
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="pass"
              placeholder="Enter Password"
              required
            />
            <button className="register" onClick={onSubmit}>
              Register
            </button>
            <p style={{ color: "red", fontSize: "25px" }}>{error.username}</p>
            <p style={{ color: "red", fontSize: "25px" }}>
              {errors.physicianRegisterError
                ? errors.physicianRegisterError.data.message
                : ""}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PhyRegisterByAdmin);
