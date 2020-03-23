import React, { useState, useEffect } from "react";
import "../../style/patient-profile.css";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalRecord, logoutUser } from "../../actions/index";
import { withRouter, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatientData = props => {
  const dispatch = useDispatch();
  const record = useSelector(state => state.record);
  // const [records, setRecords] = useState({});

  useEffect(() => {
    if (
      !localStorage.jwtToken &&
      localStorage.getItem("userRole") === "ADMIN"
    ) {
      dispatch(logoutUser(props.history));
    }

    if (!record.recordData.treatment) {
      if (props.location.state.state) {
        dispatch(
          getMedicalRecord(
            props.location.state.state,
            props.location.state.role,
            props.history
          )
        );
      } else {
        if (props.location.state.role === "PATIENT") {
          props.history.push("/patient/profile");
        } else if (props.location.state.role === "PHYSICIAN") {
          props.history.push("/physician/patient/treatment");
        }
      }
    }
  }, []);

  const recordFields = () => {
    return (
      <div>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Anamneses</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.anamneses
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Diagnoses</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.diagnoses
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Medications</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.medications
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Medical Findings</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.medicalFindings
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Medical Letter</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.medicalLetter
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Location Of Treatment</Card.Title>
            <Card.Text>
              {record.recordData.treatment
                ? record.recordData.treatment.locationOfTreatment
                : ""}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Text>
              Treatment Date:{" "}
              {record.recordData.treatment
                ? (
                  <DatePicker
                    placeholderText="Click to select a date"
                    selected={record.recordData.treatment.treatmentDate ? Date.parse(record.recordData.treatment.treatmentDate) : ""}

                    inline
                    disabled
                  />
                )
                : "Not available"}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };
  const returnButtonDependingOnRole = () => {
    if (record.role === "PATIENT") {
      return (
        <Link to="/patient/profile">
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "5px 5px 5px 20px", padding: "5px 25px 5px 25px" }}
          >
            &#8592; Go Back
          </Button>
        </Link>
      );
    } else if (record.role === "PHYSICIAN") {
      return (
        <Link to="/physician/patient/treatment">
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "5px 5px 5px 20px", padding: "5px 25px 5px 25px" }}
          >
            &#8592; Go Back
          </Button>
        </Link>
      );
    }
  };

  const returnContactButtonDependingOnRole = () => {
    if (record.role === "PATIENT") {
      return (
      <div></div>
      );
    } else if (record.role === "PHYSICIAN") {
      return (
        <div></div>
      );
    }
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>{returnButtonDependingOnRole()}</div>
      <div className="main-patient">
        {/* {console.log(record)} */}
        {/* {console.log(props.location.state)} */}

        <div className="patient-records">
          <h4 className="patient-form-heading">Medical Records</h4>
          {recordFields()}
        </div>
        <div className="patient-details">
          <Form>
            <h4 className="patient-form-heading">Physician</h4>
            <Form.Group controlId="formGridName">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                readOnly
                defaultValue={
                  record.recordData.physician
                    ? record.recordData.physician.name
                    : ""
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridSurname">
              <Form.Control
                type="text"
                placeholder="Enter Surname"
                readOnly
                defaultValue={
                  record.recordData.physician
                    ? record.recordData.physician.surname
                    : ""
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                readOnly
                defaultValue={
                  record.recordData.physician
                    ? record.recordData.physician.email
                    : ""
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                readOnly
                defaultValue={
                  record.recordData.physician
                    ? record.recordData.physician.address
                    : ""
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridPhone">
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                readOnly
                defaultValue={
                  record.recordData.physician
                    ? record.recordData.physician.phoneNumber
                    : ""
                }
              />
            </Form.Group>
            <div className="patient-data-form-btns">
              {returnContactButtonDependingOnRole()}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PatientData;
