import React from 'react'
import createReactClass from 'create-react-class'

export default createReactClass({
    _handleClick: function () {
        alert()
    },

    render: function () {
        return (
            <html>
                <head>
                    <title>Universal App with React</title>
                    <link rel='stylesheet' href='/stylesheets/style.css'/>
                </head>
                <body>
                    <div>
                        <h1>Hello World!</h1>
                        <p>parapapaaam!</p>
                        <button onClick={this._handleClick}>Click Me</button>
                    </div>
                <script src='/javascripts/bundle.js' />
                </body>
            </html>
        );
    }
})