import React from 'react'

export default class GoogleSignInButton extends React.Component {
    render() {
        return (
            <a className='btn btn-danger' href='/auth/google'>
                <span className='fa fa-google-plus'>Google</span>
            </a>
        );
    }
}