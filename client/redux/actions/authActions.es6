import {post} from "../../../lib/services/RequestAdapter";

export const AUTH_BEGIN = 'AUTH_BEGIN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export function authBegin() {
  return {type: AUTH_BEGIN, token: null};
}

export function authSuccess(token) {
  return {type: AUTH_SUCCESS, token: token};
}

export function authFailure(error) {
  return {type: AUTH_FAILURE, token: null};
}

export function authorization(data) {
  return (dispatch) => {
    dispatch(authBegin());
    dispatch(post('auth/google', data))
      .then(res => dispatch(authSuccess(data.idToken)))
      .catch(err => dispatch(authFailure(err)));
  };
}