import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthorized} = rest;

  console.log('PRIVATE ROUTE IS AUTHED', isAuthorized);
  return (
    <Route {...rest} render={props => (
      isAuthorized ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      )
    )}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthorized: Boolean(state.auth.token)
  };
}

export default connect(mapStateToProps)(PrivateRoute);