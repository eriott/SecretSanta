import React from 'react'

export default class Postcard extends React.Component {
    render() {
        return (
            <div className='postcard'>
                <PostcardRow header={'Telegram'} value={'@' + this.props.telegramLogin}/>
                <PostcardRow header={'Full Name'} value={this.props.fullName}/>
                <PostcardRow header={'Address'} value={this.props.address}/>
                <PostcardRow header={'About'} value={this.props.about}/>
            </div>
        );
    }
}

class PostcardRow extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='col-lg-3 postcard-item-header'>
                    {this.props.header}
                </div>
                <div className='col-lg-9'>
                    {this.props.value}
                </div>
            </div>
        );
    }
}