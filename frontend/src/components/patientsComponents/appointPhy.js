import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import axios from "axios";
import { proxy, logoutUser } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AppointPhy = props => {
  const dispatch = useDispatch();
  const [physicians, setPhysicians] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (
      !(localStorage.jwtToken && localStorage.getItem("userRole") === "PATIENT")
    ) {
      dispatch(logoutUser(props.history));
    } else {
      axios
        .get(`${proxy}/getallphysicians`)
        .then(res => {
          setPhysicians(res.data.physiciansData);
          setLoading(false);
        })
        .catch(err => alert(err.response.data.message));
    }
  }, []);

  const onPhysicianSelect = d => {
    const data = { physicianId: d + "" };
    // console.log(data);
    axios
      .post(`${proxy}/createamedicalappointment`, data)
      .then(res => props.history.push("/patient/profile"))
      .catch(err => alert(err.response.data.message));
  };

  const cards = () => {
    return physicians.map(d => (
      <Card key={d.id} style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>
            Name:{" "}
            {d.name || d.surname ? d.name + " " + d.surname : "Not Available"}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Email: {d.email ? d.email : "Not available"}
          </Card.Subtitle>
          <Card.Link href="#" onClick={() => onPhysicianSelect(d.id)}>
            Select
          </Card.Link>
        </Card.Body>
      </Card>
    ));
  };

  return loading ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h4
          className="patient-form-heading"
          style={{ marginBottom: "20px", marginTop: "10px" }}
        >
          All Physicians
        </h4>{" "}
        {cards()}
      </div>
    </div>
  );
};

export default withRouter(AppointPhy);
