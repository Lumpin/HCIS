import React, { useState, useEffect } from "react";
import "../../style/patient-profile.css";
import { Form, Col, Button, Row, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  proxy,
  getMedicalRecord,
  patientProfileUpdate,
  updatePatientInsurance,
  getCurrentPatient,
  getCurrentPatientInsurance,
  logoutUser
} from "../../actions/index";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PatientProfile = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [insuranceName, setInsuranceName] = useState("");
  const [insuranceId, setInsuranceId] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [showSucc, setShowSucc] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !(localStorage.jwtToken && localStorage.getItem("userRole") === "PATIENT")
    ) {
      dispatch(logoutUser(props.history));
    } else {
      dispatch(getCurrentPatient());
      dispatch(getCurrentPatientInsurance());
      axios
        .get(`${proxy}/getpatientdetails`)
        .then(res => {
          const data = res.data;
          setName(data.name ? data.name : "");
          setSurname(data.surname ? data.surname : "");
          setGender(data.gender ? data.gender : "");
          setDate(data.date ? data.date : "");
          setAddress(data.address ? data.address : "");
          setEmail(data.email ? data.email : "");
          setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
        })
        .catch(err => setShowErr(true));
      axios
        .get(`${proxy}/getpatientinsurancedetails`)
        .then(res => {
          const data = res.data;
          setInsuranceName(data.name ? data.name : "");
          setInsuranceId(data.insuranceid ? data.insuranceid : "");
        })
        .catch(err => setShowErr(true));
      axios
        .get(`${proxy}/getmedicalrecords`)
        .then(res => {
          setMedicalRecords(res.data.medicalListDtoList);
          setLoading(false);
        })
        .catch(err => setShowErr(true));
    }
  }, []);

  function AlertDismissibleError() {
    if (showErr) {
      return (
        <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
          <Alert.Heading>Error: Internal Server Error!</Alert.Heading>
        </Alert>
      );
    }
    return "";
  }

  function AlertDismissibleSuccess() {
    if (showSucc) {
      return (
        <Alert variant="success" onClose={() => setShowSucc(false)} dismissible>
          <Alert.Heading>Patient successfully deleted!</Alert.Heading>
        </Alert>
      );
    }
    return "";
  }

  const onProfileSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      date,
      surname,
      gender,
      address,
      email,
      phoneNumber
    };
    // console.log(data);
    dispatch(patientProfileUpdate(data));
  };
  const onInsuranceSubmit = e => {
    e.preventDefault();
    const data = {
      name: insuranceName,
      insuranceid: insuranceId
    };
    // console.log(data);
    dispatch(updatePatientInsurance(data));
  };

  const onRecordSelect = recordId => {
    // console.log(recordId);
    dispatch(getMedicalRecord(recordId, "PATIENT", props.history));
    // to="/profile/patient/data"
  };

  const cards = () => {
    return medicalRecords.map(d => (
      <Card key={d.id} style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>{"Record Data " + d.id}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {"Physician Name: " + d.physicianName}
          </Card.Subtitle>
          <Card.Text>{d.date}</Card.Text>
          <Card.Link onClick={() => onRecordSelect(d.id)} href="#">
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
          <AlertDismissibleError />
          <AlertDismissibleSuccess />
          <Form.Group controlId="formGridName">
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGridSurname">
            <Form.Control
              value={surname}
              onChange={e => setSurname(e.target.value)}
              type="text"
              placeholder="Enter Surname"
              required
            />
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Date of Birth:
            </Form.Label>
            <Col sm={8}>
              <DatePicker
                placeholderText="Click to select a date"
                selected={Date.parse(date)}
                onChange={d => setDate(d)}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="formGridEmail">
            <Form.Control
              value={address}
              onChange={e => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
              required
            />
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Gender:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                value={gender}
                onChange={e => setGender(e.target.value)}
                as="select"
                required
              >
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={6}>
              <Form.Control
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Enter Phone Number"
                required
              />
            </Col>
          </Form.Group>
          <Button
            style={{ marginBottom: "15px" }}
            variant="primary"
            type="submit"
            onClick={onProfileSubmit}
          >
            Update Account
          </Button>{" "}
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={4}>
              <Form.Control
                value={insuranceName}
                onChange={e => setInsuranceName(e.target.value)}
                type="text"
                placeholder="Insurance Name"
                required
              />
            </Col>
            <Col sm={4}>
              <Form.Control
                value={insuranceId}
                onChange={e => setInsuranceId(e.target.value)}
                type="text"
                placeholder="Insurance ID"
                required
              />
            </Col>
            <Col sm={4}>
              <Button
                onClick={onInsuranceSubmit}
                variant="primary"
                type="submit"
              >
                Update Insurance
              </Button>{" "}
            </Col>
          </Form.Group>
          <Button
            style={{ marginBottom: "15px" }}
            variant="danger"
            type="submit"
          >
            Delete Account
          </Button>
        </Form>
      </div>

      <div className="patient-records">
        <h4 className="patient-form-heading">Medical Records</h4>{" "}
        <Button
          style={{ marginBottom: "8px" }}
          variant="primary"
          type="submit"
          onClick={() =>
            name && surname
              ? props.history.push("/patient/appoint/physician")
              : alert("Please update your profile, before creating a record")
          }
        >
          Create Appointment
        </Button>
        {cards() ? cards() : "Nothing to show here"}
      </div>
    </div>
  );
};

export default withRouter(PatientProfile);
