import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {profileUpdated} from '../client/redux/actions/profileActions'

const propTypes = {
    dispatch: PropTypes.func.isRequired
};

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.saveProfile = this.saveProfile.bind(this);
    }

    saveProfile(e) {
        e.preventDefault();

        var data = {};
        data.fullName = $('#fullName').val();
        data.address = $('#address').val();
        data.about = $('#about').val();
        data.telegramLogin = $('#telegramLogin').val();

        this.props.dispatch(profileUpdated(data));

        // axios.post('/update_profile', data).then(response => {
        //     let result = response.data;
        //
        //     $('#reply').text("Saved.").delay(2000).animate({opacity: 0});
        //     //
        //     // let badgeExists = $('#profile-tab').find('.badge').length > 0;
        //     //
        //     // if (!badgeExists && (result.postData.fullName === '' || result.postData.address === '')) {
        //     //     $('#profile-tab').append('<span class="badge badge-warning">!</span>');
        //     // }
        //     //
        //     // if (badgeExists && result.postData.fullName !== '' && result.postData.address !== '') {
        //     //     $('#profile-tab .badge').remove();
        //     // }
        //     this.props.dispatch(profileUpdated())
        //
        // }).catch(function (error) {
        //     console.log(error);
        // });
    }

    render() {
        return (
            <form id='update-profile-form' name='update-profile'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input id='fullName' className='form-control' type='text' name='fullName'
                                   defaultValue={this.props.postData.fullName}
                                   placeholder='Full name'/>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <div className='input-group'>
                                <span id='login-symbol' className='input-group-addon'>@</span>
                                <input id='telegramLogin' className='form-control' type='text'
                                       defaultValue={this.props.telegramLogin}
                                       placeholder='Telegram login' aria-label='Telegram login'
                                       aria-describedby='login-symbol'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <textarea id='address' className='form-control'
                              placeholder='Address: city, street, house, zip-code' cols='40' rows='5'>
                        {this.props.postData.address}
                    </textarea>
                </div>
                <div className='form-group'>
                    <textarea id='about' className='form-control' placeholder='About you' cols='40'
                              rows='10'>
                        {this.props.about}
                    </textarea>
                </div>
                <div className='form-group'>
                    <button id='submit' className='btn btn-main' onClick={this.saveProfile}>Save
                    </button>
                    <label id='reply'/>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

ProfileForm.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileForm);