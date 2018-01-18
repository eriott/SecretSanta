import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Secret Santa</title>
                    <meta charSet='utf-8'/>
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'/>
                    <link rel='stylesheet'
                          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
                          integrity='sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb'
                          crossOrigin='anonymous'/>
                    <link rel='stylesheet' href='/stylesheets/style.css'/>
                    <script src='/javascripts/jquery-3.2.1.min.js'/>
                    <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js'
                            integrity='sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh'
                            crossOrigin='anonymous'/>
                    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js'
                            integrity='sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ'
                            crossOrigin='anonymous'/>
                </head>
            <body>
                <Header />
                {this.props.children}
                <script src='/javascripts/bundle.js'/>
            </body>
            </html>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className='container-fluid bg-main jumbotron jumbotron-fluid text-center'>
                <h1>
                    <span className='fa fa-lock text-white font-weight-bold'>
                        Secret Santa
                    </span>
                </h1>
            </div>
        );
    }
}