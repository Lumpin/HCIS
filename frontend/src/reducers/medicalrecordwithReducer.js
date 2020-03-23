import { GET_MEDICAL_RECORD_WITH_ID } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  recordData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICAL_RECORD_WITH_ID:
      // console.log(action.payload)
      return {
        ...state,
        recordData: action.payload
      };
    default:
      return state;
  }
}
