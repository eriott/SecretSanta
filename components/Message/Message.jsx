import React from 'react'

export default class Message extends React.Component {
    render() {
        const classes = `gift-received-message alert fade show ${this.props.type || 'alert-info'} ${this.props.class || ''}`;
        return (
            <div className={classes} role='alert'>
                <strong>{this.props.header}</strong>{this.props.content}
                <image src={this.props.image}/>
            </div>
        );
    }
}