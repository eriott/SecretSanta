import React from 'react'

export default class CheckBox extends React.Component {
    render() {
        return (
            <div className='checkbox'>
                <label className={`${this.props.name} custom-control custom-checkbox`}>
                    <input className='custom-control-input' type='checkbox' name={this.props.name} checked={this.props.checked ? 'checked' : undefined}/>
                    <span className='custom-control-indicator'/>
                    <span className='custom-control-description'>{this.props.title}</span>
                </label>
            </div>
        );
    }
}