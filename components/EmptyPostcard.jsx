import React from 'react'

export default class EmptyPostcard extends React.Component {
    render() {
        return (
            <div className='empty-postcard'>
                <p>Nothing here yet!</p>
                <p>You'll get an address at</p>
                <p><span className='sending-date'>{this.props.assignDate}</span></p>
            </div>
        );
    }
}