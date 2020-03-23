import React, { useState, useEffect } from "react";
import "../../style/patient-profile.css";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  proxy,
  getPatientWithId,
  getMedicalRecord,
  getMedicalRecordWithId,
  logoutUser
} from "../../actions/index";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const PatientTreatment = props => {
  const dispatch = useDispatch();
  const patientWithId = useSelector(state => state.patientWithId);

  useEffect(() => {
    if (
      !(
        localStorage.jwtToken &&
        localStorage.getItem("userRole") === "PHYSICIAN"
      )
    ) {
      dispatch(logoutUser(props.history));
    }
    if (!patientWithId.patientInformation[0]) {
      if (props.location.state) {
        // console.log(props.location.state.state);
        dispatch(
          getPatientWithId(
            props.location.state.pId,
            props.location.state.rId,
            props.history
          )
        );
      } else {
        props.history.push("/physician/profile");
      }
    }
    if (patientWithId.recordId === null) {
      props.history.push("/physician/profile");
    }
  }, []);

  const onAddTreatmentClick = () => {
    // console.log(patientWithId.recordId);
    dispatch(getMedicalRecordWithId(patientWithId.recordId, props.history));
  };

  const onDismissPatient = e => {
    e.preventDefault();
    axios
      .post(`${proxy}/dismissPatient/?recordid=${patientWithId.recordId}`)
      .then(res => {
        alert("Patient Successfully Dismissed!");
        props.history.push("/physician/profile");
      })
      .catch(err => alert(err.response.data.message));
  };

  const onRecordSelect = recordId => {
    // console.log(recordId);
    dispatch(getMedicalRecord(recordId, "PHYSICIAN", props.history));
    // to="/profile/patient/data"
  };

  const cards = () => {

    if (patientWithId.patientInformation[0]) {
      return patientWithId.patientInformation.map(d => (
        <Card style={{ width: "30rem" }}>
          {/* {console.log(patientWithId.patientInformation)} */}
          <Card.Body>
            {/* {console.log(d.treatment ? d.treatment : "")} */}
            <Card.Title>Record Data {d.id}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {d.physician.name + " " + d.physician.surname}
            </Card.Subtitle>
            <Card.Link href="#" onClick={() => onRecordSelect(d.id)}>
              Details
            </Card.Link>
          </Card.Body>
        </Card>
      ));
    }
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Link to="/physician/profile">
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "5px 5px 5px 20px", padding: "5px 25px 5px 25px" }}
          >
            &#8592; Go Back
          </Button>
        </Link>
      </div>
      <div className="main-patient">
        <div className="patient-details">
          <Form>
            <h4 className="patient-form-heading">Patient Information</h4>
            <Form.Group as={Row} controlId="formHorizontalName">
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.name
                      : "Not availble"
                  }
                />
              </Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter Surname"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.surname
                      : "Not availble"
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={4}>
                Date of Birth:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? moment(patientWithId.patientInformation[0].patient.date ? patientWithId.patientInformation[0].patient.date : "").format("MMMM Do YYYY")
                      : ""
                  }
                />

              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={4}>
                Gender:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.gender
                      : "Not availble"
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridAddress">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                readOnly
                value={
                  patientWithId.patientInformation[0]
                    ? patientWithId.patientInformation[0].patient.address
                    : "Not availble"
                }
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={6}>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.email
                      : "Not availble"
                  }
                />
              </Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.phoneNumber
                      : "Not availble"
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Insurance Name"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.insurance
                          .name
                      : "Not availble"
                  }
                />
              </Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Insurance ID"
                  readOnly
                  value={
                    patientWithId.patientInformation[0]
                      ? patientWithId.patientInformation[0].patient.insurance
                          .insuranceid
                      : "Not availble"
                  }
                />
              </Col>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              
              <br />
              <Button
                variant="danger"
                type="submit"
                style={{ marginTop: "10px" }}
                onClick={onDismissPatient}
              >
                Dismiss Patient
              </Button>{" "}
            </div>
            {/* <div style={{ textAlign: "center" }}>
            <Calendar onChange={""} style={{ width: "100%" }} />
          </div> */}
          </Form>
        </div>

        <div className="patient-records">
          <h4 className="patient-form-heading">Medical Records</h4>{" "}
          <Button
            style={{ marginBottom: "10px" }}
            variant="primary"
            type="submit"
            onClick={() => onAddTreatmentClick()}
          >
            Add Treatment
          </Button>
          {cards()}
        </div>
      </div>
    </>
  );
};

export default withRouter(PatientTreatment);
