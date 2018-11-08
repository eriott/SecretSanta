import axios from 'axios';

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
    axios.post('/auth/google', data)
      .then(response => {
        console.log('auth response', response);
        let result = response.data;
        console.log('auth', result);
        return dispatch(authSuccess(data.idToken));
      })
      .catch(function (error) {
        console.log('auth response', error);
        return dispatch(authFailure(error));
      });
  };
}