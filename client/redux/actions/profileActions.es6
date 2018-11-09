import {get} from '../../../lib/services/RequestAdapter';

export const PROFILE_UPDATED = 'PROFILE_UPDATED';
export const REQUEST_PROFILE_SUCCESS = 'REQUEST_PROFILE_SUCCESS';
export const REQUEST_PROFILE_FAILURE = 'REQUEST_PROFILE_FAILURE';

export function profileUpdated(profile) {
  return {type: PROFILE_UPDATED, profile: profile};
}

export function requestProfileSuccess(profile) {
  return {type: REQUEST_PROFILE_SUCCESS, profile: profile};
}

export function requestProfileFailure(error) {
  return {type: REQUEST_PROFILE_FAILURE, error: error};
}

export function requestProfile() {
  return (dispatch) => {
    dispatch(get('profile'))
      .then(profile => dispatch(requestProfileSuccess(profile)))
      .catch(err => dispatch(requestProfileFailure(err)));
  };
}