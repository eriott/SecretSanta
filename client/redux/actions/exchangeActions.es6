import axios from 'axios';
import {fromISOString} from "../../../utils/Dates";

export const EXCHANGE_CREATE_BEGIN = 'EXCHANGE_ADD_BEGINS';
export const EXCHANGE_CREATE_SUCCESS = 'EXCHANGE_CREATE_SUCCESS';
export const EXCHANGE_CREATE_FAILURE = 'EXCHANGE_CREATE_FAILURE';

export function createExchangeBegin(exchange) {
  return {type: EXCHANGE_CREATE_BEGIN, exchange: exchange};
}

export function createExchangeSuccess(exchange) {
  return {type: EXCHANGE_CREATE_SUCCESS, exchange: exchange};
}

export function createExchangeFailure(exchange, error) {
  return {type: EXCHANGE_CREATE_FAILURE, exchange: exchange, error: error};
}

export function startExchange(exchange) {
  return (dispatch, getState) => {
    dispatch(createExchangeBegin(exchange));
    console.log(getState().auth.user.google.token);
    try {
      axios.defaults.headers.common['Authorization'] = getState().auth.user.google.token;
    } catch (err) {
      console.log(err);
    }
    axios.post('/exchanges', exchange)
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