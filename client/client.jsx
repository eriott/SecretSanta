import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from "./redux/configureStore";
import routes from '../routes';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const component = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

ReactDOM.hydrate(component, document.getElementById('react-view'));