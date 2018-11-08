import React from 'react'
import config from '../config';

export default class GoogleSignInButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';

    script.onload = () => {
      window.gapi.load('auth2', () => {
        console.log('Google API loaded');
        this.auth2 = window.gapi.auth2.init({
          client_id: config.googleAuth.clientID,
          fetch_basic_profile: false,
          scope: 'profile'
        });
      });
    };

    document.body.appendChild(script);
  }

  handleSignInClick(e) {
    e.preventDefault();

    this.auth2.signIn().then(() => {
      const user = this.auth2.currentUser.get();
      this.props.onSignIn(user);
    });
  }

  render() {
    return (
      <button className='btn btn-danger' onClick={this.handleSignInClick}>Google</button>
    );
  }
}