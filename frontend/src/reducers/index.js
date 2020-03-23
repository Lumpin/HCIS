import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import medicalrecordReducer from "./medicalrecordReducer.js";
import patientinformationReducer from "./patientinformationReducer";
import medicalrecordwithReducer from "./medicalrecordwithReducer.js";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  record: medicalrecordReducer,
  patientWithId: patientinformationReducer,
  seletedRecord : medicalrecordwithReducer
});
