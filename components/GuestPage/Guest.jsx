import React from 'react'
import GoogleSignInButton from "../GoogleSignInButton";
import {authorization} from "../../client/redux/actions/authActions";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(user) {
    this.props.dispatch(authorization({idToken: user.Zi.id_token}));
  }

  render() {
    if (this.props.isAuthorized) {
      return <Redirect to='/'/>
    }

    return (
      <div className='container text-center'>
        <p>Login or Register with:</p>
        <GoogleSignInButton onSignIn={this.onSignIn}/>
      </div>
    );
  }
}

Guest.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthorized: Boolean(state.auth.token)
  };
}

export default connect(mapStateToProps)(Guest);