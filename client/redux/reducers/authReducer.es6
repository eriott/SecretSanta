import {AUTH_BEGIN, AUTH_FAILURE, AUTH_SUCCESS} from "../actions/authActions";

const initialState = {token: null};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_BEGIN:
      return Object.assign({}, state, {token: null});
    case AUTH_SUCCESS:
      return Object.assign({}, state, {token: action.token});
    case AUTH_FAILURE:
      return Object.assign({}, state, {token: null});
    default:
      return state;
  }
}