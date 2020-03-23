import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { proxy } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/index";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DeletePhysician = props => {
  const dispatch = useDispatch();
  const [physicians, setPhysicians] = useState([]);
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});
  const [showErr, setShowErr] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !(localStorage.jwtToken && localStorage.getItem("userRole") === "ADMIN")
    ) {
      dispatch(logoutUser(props.history));
    }
    axios
      .get(`${proxy}/getallphysicians`)
      .then(res => {
        setPhysicians(res.data.physiciansData);
        setLoading(false);
      })
      .catch(err => alert(err.response.data.message));
  }, []);

  function AlertDismissibleError() {
    if (showErr) {
      return (
        <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
          <Alert.Heading>Error: Can not delete Physician!</Alert.Heading>
        </Alert>
      );
    }
    return "";
  }

  function AlertDismissibleSuccess() {
    if (showSucc) {
      return (
        <Alert variant="success" onClose={() => setShowSucc(false)} dismissible>
          <Alert.Heading>Physician successfully deleted!</Alert.Heading>
        </Alert>
      );
    }
    return "";
  }

  const onPhysicianSelect = d => {
    axios
      .post(`${proxy}/deletePhysician/?physicianId=${d}`)
      .then(res => setPhysicians(physicians.filter(p => p.id !== d)))
      .then(res => setShowSucc(true))
      .catch(err => setShowErr(true));
  };

  const cards = () => {
    return physicians.map(d => (
      <Card key={d.id} style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>{d.name + " " + d.surname}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {d.email ? d.email : "Not Availble"}
          </Card.Subtitle>
          <Button
            variant="danger"
            type="submit"
            onClick={() => onPhysicianSelect(d.id)}
          >
            Delete
          </Button>
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
          Delete Physicians
        </h4>{" "}
        <AlertDismissibleError />
        <AlertDismissibleSuccess />
        {cards()}
      </div>
    </div>
  );
};

export default withRouter(DeletePhysician);
