import React from 'react'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className='container-fluid bg-main jumbotron jumbotron-fluid text-center'>
        <h1>
          <span className='fa fa-lock text-white font-weight-bold'>Secret Santa</span>
        </h1>
      </div>
    );
  }
}