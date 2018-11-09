import axios from 'axios';
import {get} from '../../../lib/services/RequestAdapter';
import {fromISOString} from "../../../utils/Dates";

export const EXCHANGE_CREATE_BEGIN = 'EXCHANGE_ADD_BEGINS';
export const EXCHANGE_CREATE_SUCCESS = 'EXCHANGE_CREATE_SUCCESS';
export const EXCHANGE_CREATE_FAILURE = 'EXCHANGE_CREATE_FAILURE';
export const REQUEST_EXCHANGES_SUCCESS = 'REQUEST_EXCHANGES_SUCCESS';
export const REQUEST_EXCHANGES_FAILURE = 'REQUEST_EXCHANGES_FAILURE';

export function createExchangeBegin(exchange) {
  return {type: EXCHANGE_CREATE_BEGIN, exchange: exchange};
}

export function createExchangeSuccess(exchange) {
  return {type: EXCHANGE_CREATE_SUCCESS, exchange: exchange};
}

export function createExchangeFailure(exchange, error) {
  return {type: EXCHANGE_CREATE_FAILURE, exchange: exchange, error: error};
}

export function requestExchangesSuccess(exchanges) {
  return {type: REQUEST_EXCHANGES_SUCCESS, exchanges: exchanges};
}

export function requestExchangesFailure(error) {
  return {type: REQUEST_EXCHANGES_FAILURE, error: error};
}

export function startExchange(exchange) {
  return (dispatch, getState) => {
    dispatch(createExchangeBegin(exchange));
    try {
      axios.defaults.headers.common['Authorization'] = getState().auth.user.google.token;
    } catch (err) {
      console.log(err);
    }
    axios.post('/exchanges', exchange, {withCredentials: true})
      .then(response => {
        let result = response.data;
        result.startDate = fromISOString(result.startDate);
        result.endDate = fromISOString(result.endDate);
        console.log('axios.post', result);
        return dispatch(createExchangeSuccess(result));
      })
      .catch(function (error) {
        console.log('axios.post', error);
        return dispatch(createExchangeFailure(exchange, error));
      });
  };
}

export function requestExchanges() {
  return (dispatch) => {
    dispatch(get('exchanges'))
      .then(exchanges => dispatch(requestExchangesSuccess(exchanges)))
      .catch(err => dispatch(requestExchangesFailure(err)));
  };
}