import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './reducers/profileReducer';

export default function (initialState = {}) {
    const rootReducer = combineReducers({
        profile: profileReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}