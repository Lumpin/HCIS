import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  proxy,
  selectedRecordId,
  getMedicalRecordWithId,
  logoutUser
} from "../../actions/index";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const MeicalRecordDetails = props => {
  const dispatch = useDispatch();
  const seletedRecord = useSelector(state => state.seletedRecord);
  const [recordId, setRecordId] = useState("");
  const [anamneses, setAnamneses] = useState("");
  const [diagnoses, setDiagnoses] = useState("");
  const [locationOfTreatment, setLocationOfTreatment] = useState("");
  const [medicalFindings, setMedicalFindings] = useState("");
  const [medications, setMedications] = useState("");
  const [medicalLetter, setMedicalLetter] = useState("");
  const [status, setStatus] = useState("");
  const [treatmentDate, setTreatmentDate] = useState(new Date());

  useEffect(() => {
    if (
      !(
        localStorage.jwtToken &&
        localStorage.getItem("userRole") === "PHYSICIAN"
      )
    ) {
      dispatch(logoutUser(props.history));
    }
    if (seletedRecord.recordData.treatment) {
      dispatch(selectedRecordId(seletedRecord.recordData.id));
      setRecordId(seletedRecord.recordData.id);
      setAnamneses(seletedRecord.recordData.treatment.anamneses);
      setDiagnoses(seletedRecord.recordData.treatment.diagnoses);
      setLocationOfTreatment(
        seletedRecord.recordData.treatment.locationOfTreatment
      );
      setMedicalFindings(seletedRecord.recordData.treatment.medicalFindings);
      setMedications(seletedRecord.recordData.treatment.medications);
      setMedicalLetter(seletedRecord.recordData.treatment.medicalLetter);
      setTreatmentDate(seletedRecord.recordData.treatment.treatmentDate);
      setStatus(seletedRecord.recordData.treatment.status);
    } else {
      if (props.location.state.id) {
        dispatch(selectedRecordId(props.location.state.id));
        dispatch(
          getMedicalRecordWithId(props.location.state.id, props.history)
        );
        axios
          .get(
            `${proxy}/getmedicalrecordbyid/?medicalid=${props.location.state.id}`
          )
          .then(res => {
            setRecordId(res.data.id);
            setAnamneses(res.data.treatment.anamneses);
            setDiagnoses(res.data.treatment.diagnoses);
            setLocationOfTreatment(res.data.treatment.locationOfTreatment);
            setMedicalFindings(res.data.treatment.medicalFindings);
            setMedications(res.data.treatment.medications);
            setMedicalLetter(res.data.treatment.medicalLetter);
            setTreatmentDate(res.data.treatment.treatmentDate);
            setStatus(res.data.treatment.status);
          })
          .catch(err => alert(err.response.data.message));
      } else {
        props.history.push("/physician/profile");
      }
    }
  }, []);

  const onTreatmentUpdate = e => {
    // console.log(seletedRecord.recordData);
    e.preventDefault();
    const data = {
      anamneses,
      diagnoses,
      locationOfTreatment,
      medicalFindings,
      medications,
      medicalLetter,
      status,
      treatmentDate
    };
    axios
      .put(`${proxy}/updatetreatment/?recordId=${recordId}`, data)
      .then(res => alert("Treatment Successfully Updated"))
      .catch(err => alert(err.response.data.message));
    // console.log(data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ textAlign: "left" }}>
        <Link to="/physician/patient/treatment">
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "5px 5px 5px 20px", padding: "5px 25px 5px 25px" }}
          >
            &#8592; Go Back
          </Button>
        </Link>
      </div>
      <div style={{ width: "90vw" }}>
        <h1>Edit Medical Record</h1>
        {/* {console.log(props.location.state.id)} */}
        <Form>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Anamneses
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setAnamneses(e.target.value)}
                placeholder="Anamneses"
                value={anamneses}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formdiagnoses">
            <Form.Label column sm="2">
              Diagnoses
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setDiagnoses(e.target.value)}
                placeholder="Diagnoses"
                value={diagnoses}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Location Of Treatment
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setLocationOfTreatment(e.target.value)}
                placeholder="Location Of Treatment"
                value={locationOfTreatment}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Medical Findings
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setMedicalFindings(e.target.value)}
                placeholder="Medical Findings"
                value={medicalFindings}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Medications
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setMedications(e.target.value)}
                placeholder="Medications"
                value={medications}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Medical Letter
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                onChange={e => setMedicalLetter(e.target.value)}
                placeholder="Medical Letter"
                value={medicalLetter}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formanamneses">
            <Form.Label column sm="2">
              Treatment Date
            </Form.Label>
            <Col sm="10">

                  <DatePicker
                    placeholderText="Click to select a date"
                    selected={treatmentDate ? Date.parse(treatmentDate) : ""}
                    onChange={d => setTreatmentDate(d)}
                    inline
                  />


            </Col>
          </Form.Group>
          <Button
            onClick={onTreatmentUpdate}
            variant="primary"
            type="submit"
            style={{ margin: "30px" }}
          >
            Update Treatment
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default withRouter(MeicalRecordDetails);
