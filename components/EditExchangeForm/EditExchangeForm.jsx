import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {startExchange} from "../../client/redux/actions/exchangeActions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

import './EditExchangeForm.css';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class EditExchangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', alias: '', startDate: new Date(), endDate: new Date()};

    this.handleChange = this.handleChange.bind(this);
    this.addExchange = this.addExchange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addExchange() {
    console.log('Add new exchange', this.state);
    this.props.dispatch(startExchange(this.state));
  }

  render() {
    console.log('RENDER', this.props)
    const showLoader = this.props.progress && this.props.exchange.alias === this.state.alias;
    const showError = this.props.error && this.props.exchange.alias === this.state.alias;

    return (
      <form id='edit-exchange-form' name='edit-exchange'>
        <div className='form-group'>
          <input id='exchangeName' className='form-control' type='text' name='name' placeholder='Exchange name'
                 value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className='form-group'>
          <input id='exchangeAlias' className='form-control' type='text' name='alias' placeholder='Exchange alias'
                 value={this.state.alias} onChange={this.handleChange}/>
        </div>
        <div className='form-group'>
          <input id='startDatePicker' className='form-control' type='text' data-provide="datepicker" name='startDate'
                 value={this.state.startDate} onChange={this.handleChange}/>
        </div>
        <div className='form-group'>
          <input id='endDatePicker' className='form-control' type='text' data-provide="datepicker" name='endDate'
                 value={this.state.endDate} onChange={this.handleChange}/>
        </div>
        <div className='form-group'>
          <button type="button" className="btn btn-primary float-right" onClick={this.addExchange}>
            <div style={{display: showLoader ? 'inline-block' : 'none'}} className='loader'><Loader/></div>
            Start
          </button>
          {(() => showError ?
              <Message header='Oops!' content='Error has occured :(' type='alert-danger'
                       class='exchange-error float-left'/>
              : '')()}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.exchanges.startExchange);
}

EditExchangeForm.propTypes = propTypes;

export default connect(mapStateToProps)(EditExchangeForm);