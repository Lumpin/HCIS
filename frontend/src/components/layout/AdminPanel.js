import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// protects route
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/index";
import { withRouter } from "react-router-dom";

function AdminPanel(props) {
  // protects route
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !(localStorage.jwtToken && localStorage.getItem("userRole") === "ADMIN")
    ) {
      dispatch(logoutUser(props.history));
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Admin Panel</h1>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <div>
          <Link to="/admin/register/physician">
            <Button
              variant="primary"
              type="submit"
              style={{
                margin: "5px 5px 5px 20px",
                padding: "5px 35px 5px 35px",
                fontSize: "25px"
              }}
            >
              Register Physician
            </Button>
          </Link>
        </div>
        {/* {console.log("run")} */}
        <div>
          <Link to="/admin/delete/physician">
            <Button
              variant="danger"
              type="submit"
              style={{
                margin: "5px 5px 5px 20px",
                padding: "5px 25px 5px 25px",
                fontSize: "25px"
              }}
            >
              Delete Physician
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/admin/delete/patient">
            <Button
              variant="danger"
              type="submit"
              style={{
                margin: "5px 5px 5px 20px",
                padding: "5px 25px 5px 25px",
                fontSize: "25px"
              }}
            >
              Delete Patient
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default withRouter(AdminPanel);
