import React from 'react'
import App from "../App.jsx";
import GoogleSignInButton from "../GoogleSignInButton.jsx";

export default class Guest extends React.Component {
    render() {
        return (
            <App>
                <div className='container text-center'>
                    <p>Login or Register with:</p>
                    <GoogleSignInButton/>
                </div>
            </App>
        );
    }
}