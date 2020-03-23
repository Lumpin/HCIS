import { SET_CURRENT_USER, SET_CURRENT_USER_INSURANCE } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  insurance: {},
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case SET_CURRENT_USER_INSURANCE:
      return {
        ...state,
        insurance: action.payload
      };
    default:
      return state;
  }
}
