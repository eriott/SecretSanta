import React from 'react'
import GoogleSignInButton from "../GoogleSignInButton";

export default class Guest extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <p>Login or Register with:</p>
        <GoogleSignInButton/>
      </div>
    );
  }
}