import fetch from 'node-fetch';
import {AuthError, HttpError} from '../errors';
import {authFailure} from "../../client/redux/actions/authActions";

const OK = 200;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const _post = (path, params, token) => {
  const body = params ? JSON.stringify(params) : '';
  const headers = token ? {Authorization: `Bearer ${token}`} : {};
  headers['Content-Type'] = 'application/json';
  return fetch(`/${path}`, {method: 'POST', body: body, headers: headers, credentials: 'same-origin'})
    .then(res => {
      if (res.status === OK) {
        return res.json();
      }

      console.error(`Post request ${path} finishes fish non-success status ${res.status}`);
      if (res.status === FORBIDDEN || res.status === UNAUTHORIZED) {
        throw new AuthError(res.status);
      }
      throw new HttpError(res.status);
    });
};


export const post = (path, params = {}) => {
  return (dispatch, getState) => {
    const token = getState().auth.token ? getState().auth.token : undefined;
    return _post(path, params, token).catch(err => {
      if (err instanceof AuthError) {
        dispatch(authFailure());
      }
    });
  };
};

const _get = (path, token) => {
  const headers = token ? {Authorization: `Bearer ${token}`} : {};
  headers['Content-Type'] = 'application/json';
  return fetch(`/${path}`, {method: 'GET', headers: headers, credentials: 'same-origin'})
    .then(res => {
      if (res.status === OK) {
        return res.json();
      }

      console.error(`Get request ${path} finishes fish non-success status ${res.status}`);
      if (res.status === FORBIDDEN || res.status === UNAUTHORIZED) {
        throw new AuthError(res.status);
      }
      throw new HttpError(res.status);
    });
};

export const get = (path) => {
  return (dispatch, getState) => {
    const token = getState().auth.token ? getState().auth.token : undefined;
    return _get(path, token).catch(err => {
      if (err instanceof AuthError) {
        dispatch(authFailure());
      }
    });
  };
};