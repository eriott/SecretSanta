import React from 'react'

export default class Message extends React.Component {
    render() {
        return (
            <div className='gift-received-message alert alert-info fade show' role='alert'>
                <strong>{this.props.header}</strong>{this.props.content}
                <image src={this.props.image}/>
            </div>
        );
    }
}