import React, { useState, useEffect } from "react";
import "../../style/patient-profile.css";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  proxy,
  physicianProfileUpdate,
  getCurrentPhysician,
  getPatientWithId,
  selectedRecordId,
  logoutUser
} from "../../actions/index";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PhysicianProfile = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !(
        localStorage.jwtToken &&
        localStorage.getItem("userRole") === "PHYSICIAN"
      )
    ) {
      dispatch(logoutUser(props.history));
    } else {
      dispatch(getCurrentPhysician());
      axios
        .get(`${proxy}/getphysiciandetail`)
        .then(res => {
          const data = res.data;
          setName(data.name ? data.name : "");
          setSurname(data.surname ? data.surname : "");
          setAddress(data.address ? data.address : "");
          setEmail(data.email ? data.email : "");
          setPhoneNumber(data.phonenumber ? data.phonenumber : "");
        })
        .catch(err => alert(err.response.data.message));
      // console.log(auth);
      axios
        .get(`${proxy}/getPatients`)
        .then(res => {
          setRecords(res.data.list);
          setLoading(false);
        })
        .catch(err => alert(err.response.data.message));
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      surname,
      email,
      address,
      phonenumber: phoneNumber
    };
    dispatch(physicianProfileUpdate(data));
  };

  const onPatientSelect = (patientId, recordId) => {
    // console.log(id);
    dispatch(selectedRecordId(recordId));
    dispatch(getPatientWithId(patientId, recordId, props.history));
  };

  const cards = () => {
    return records.map(d => (
      <Card key={d.recordId} style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Record {d.recordId}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Patient Name: {d.patientName ? d.patientName : "Not availble"}
          </Card.Subtitle>
          <Card.Link
            onClick={() => onPatientSelect(d.patientId, d.recordId)}
            href="#"
          >
            Details
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
    <div className="main-patient">
      <div className="patient-details">
        <Form>
          <h4 className="patient-form-heading">Personal Information</h4>
          <Form.Group controlId="formGridName">
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="formGridSurname">
            <Form.Control
              value={surname}
              onChange={e => setSurname(e.target.value)}
              type="text"
              placeholder="Enter Surname"
            />
          </Form.Group>
          <Form.Group controlId="formGridEmail">
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress">
            <Form.Control
              value={address}
              onChange={e => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
            />
          </Form.Group>
          <Form.Group controlId="formGridPhone">
            <Form.Control
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Enter Phone Number"
            />
          </Form.Group>
          <Button onClick={onSubmit} variant="primary" type="submit">
            Update Account
          </Button>{" "}
        </Form>
      </div>

      <div className="patient-records">
        <h4 className="patient-form-heading">Records Overview</h4>
        {cards()}
      </div>
    </div>
  );
};

export default withRouter(PhysicianProfile);
