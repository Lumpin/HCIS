import { GET_MEDICAL_RECORD, GET_ERRORS } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  recordData: [],
  role: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICAL_RECORD:
      // console.log(action.payload)
      return {
        recordData: action.payload.data,
        role: action.payload.role
      };
    default:
      return state;
  }
}
