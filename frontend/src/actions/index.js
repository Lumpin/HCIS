import axios from "axios";
import {
  GET_MEDICAL_RECORD_WITH_ID,
  SELECTED_RECORD_ID,
  GET_PATIENT_INFORMATION_WITH_ID,
  SET_CURRENT_USER,
  GET_ERRORS,
  SET_CURRENT_USER_INSURANCE,
  GET_MEDICAL_RECORD
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const proxy = "http://localhost:8080";
export const patientLogin = (userData, history) => dispatch => {
  // console.log(userData);
  axios
    .post(`${proxy}/authenticate`, userData)
    .then(res => {
      // console.log(res.data);
      if (res.data.role === "PATIENT") {
        const token = `Bearer ${res.data.jwt}`;
        const role = res.data.role;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userRole", role);
        setAuthToken(token);
        history.push("/patient/profile");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { patientLoginError: { data: { message: "Access Denied" } } }
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { patientLoginError: err.response }
      })
    );
};

//gets the current logged in patient
export const getCurrentPatient = () => dispatch => {
  axios
    .get(`${proxy}/getpatientdetails`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
//gets the current logged in patients insurance
export const getCurrentPatientInsurance = () => dispatch => {
  axios
    .get(`${proxy}/getpatientinsurancedetails`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER_INSURANCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
// user logoutUser
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userRole");
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
  history.push("/");
};

export const patientRegister = (userData, history) => dispatch => {
  axios
    .post(`${proxy}/register/patientregister`, userData)
    .then(res => history.push("/patient/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { patientRegisterError: err.response }
      })
    );
};

export const physicianLogin = (userData, history) => dispatch => {
  // console.log(userData);
  axios
    .post(`${proxy}/authenticate`, userData)
    .then(res => {
      if (res.data.role === "PHYSICIAN") {
        const token = `Bearer ${res.data.jwt}`;
        const role = res.data.role;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userRole", role);
        setAuthToken(token);
        history.push("/physician/profile");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: {
            physicianLoginError: { data: { message: "Access Denied" } }
          }
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { patientLoginError: err.response }
      })
    );
};

export const physicianRegister = (userData, history) => dispatch => {
  // console.log(userData);
  axios
    .post(`${proxy}/createPhysician`, userData)
    .then(res => history.push("/admin/panel"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { physicianRegisterError: err.response }
      })
    );
};

// get current physician details

export const getCurrentPhysician = () => dispatch => {
  axios
    .get(`${proxy}/getphysiciandetail`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const adminLogin = (userData, history) => dispatch => {
  axios
    .post(`${proxy}/authenticate`, userData)
    .then(res => {
      if (res.data.role === "ADMIN") {
        const token = `Bearer ${res.data.jwt}`;
        const role = res.data.role;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userRole", role);
        setAuthToken(token);
        history.push("/admin/panel");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { adminLoginError: { data: { message: "Access Denied" } } }
        });
      }
    })
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: { adminLoginError: err.response } })
    );
  // console.log(userData);
};
export const physicianProfileUpdate = userData => dispatch => {
  axios
    .put(`${proxy}/updatephysician`, userData)
    .then(res => alert("Physician Profile Updated"))
    .catch(err => alert(err.response.data.message));
  // console.log(userData);
};

export const patientProfileUpdate = userData => dispatch => {
  axios
    .put(`${proxy}/addpatientdetails`, userData)
    .then(res => alert("Patient Profile Updated"))
    .catch(err => alert(err.response.data.message));
  // console.log(userData);
};

export const updatePatientInsurance = userData => dispatch => {
  axios
    .put(`${proxy}/addpatientinsurancedetails`, userData)
    .then(res => alert("Insurance updated"))
    .catch(err => alert(err.response.message));
};

// gets the patient record including the physician they have selected
export const getMedicalRecord = (recordId, role, history) => dispatch => {
  axios
    .get(`${proxy}/getamedicalrecord/?medicalRecordId=${recordId}`)
    .then(res =>
      dispatch({
        type: GET_MEDICAL_RECORD,
        payload: { data: res.data, role: role }
      })
    )
    .then(res =>
      history.push("/profile/patient/data", { state: recordId, role: role })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// gets patient detail with id including medical treatment
export const getPatientWithId = (patientId, recordId, history) => dispatch => {
  axios
    .get(`${proxy}/getpatientDetails/?patientid=${patientId}`)
    .then(res =>
      dispatch({
        type: GET_PATIENT_INFORMATION_WITH_ID,
        payload: res.data
      })
    )
    .then(res =>
      history.push("/physician/patient/treatment", {
        pId: patientId,
        rId: recordId
      })
    )
    .catch(err => alert(err.response.data.message));
};

export const selectedRecordId = recordId => dispatch => {
  dispatch({
    type: SELECTED_RECORD_ID,
    payload: recordId
  });
};

export const getMedicalRecordWithId = (recordId, history) => dispatch => {
  axios
    .get(`${proxy}/getmedicalrecordbyid/?medicalid=${recordId}`)
    .then(res =>
      dispatch({
        type: GET_MEDICAL_RECORD_WITH_ID,
        payload: res.data
      })
    )
    .then(res => history.push("/physician/patient/record", { id: recordId }))
    .catch(err => alert(err.response.data.message));
};
