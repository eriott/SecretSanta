import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import exchangeReducer from "./reducers/exchangeReducer";

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    exchanges: exchangeReducer
  });

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}