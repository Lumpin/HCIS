import {
  GET_PATIENT_INFORMATION_WITH_ID,
  SELECTED_RECORD_ID
} from "../actions/types";

const initialState = {
  patientInformation: [],
  recordId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_INFORMATION_WITH_ID:
      // console.log(action.payload)
      return {
        ...state,
        patientInformation: action.payload
      };
    case SELECTED_RECORD_ID:
      return {
        ...state,
        recordId: action.payload
      };
    default:
      return state;
  }
}
