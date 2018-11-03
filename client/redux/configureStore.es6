import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
  });

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}