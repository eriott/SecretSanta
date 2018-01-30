import React from 'react'

export default class ProfileForm extends React.Component {
    render() {
        return (
            <form classID='update-profile-form' name='update-profile'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input classID='fullName' className='.form-control' type='text' name='fullName' value=''
                                   placeholder='Full name'/>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <div className='input-group'>
                                <span classID='login-symbol' className='.input-group-addon'>@</span>
                                <input classID='telegramLogin' className='.form-control' type='text' value=''
                                       placeholder='Telegram login' aria-label='Telegram login'
                                       aria-describedby='login-symbol'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <div className='input-group'>
                            <textarea classID='address' className='.form-control'
                                      placeholder='Address: city, street, house, zip-code' cols='40' rows='5'>
                            </textarea>
                    </div>
                </div>
                <div className='form-group'>
                    <div className='input-group'>
                            <textarea classID='about' className='.form-control' placeholder='About you' cols='40'
                                      rows='10'>
                            </textarea>
                    </div>
                </div>
                <div className='form-group'>
                    <button classID='submit' className='btn btn-main'>Save</button>
                    <label classID='reply'/>
                </div>
            </form>
        );
    }
}

/*
                form#update-profile-form(name="update-profile")
                    div.row
                        div.col-lg-8
                            div.form-group
                                input.form-control#fullName(type="text", name="fullName", value="#{user.postData.fullName}", placeholder='Full name')
                        div.col-lg-4
                            div.form-group
                                div.input-group
                                    span.input-group-addon#login-symbol
                                        | @
                                    input.form-control#telegramLogin(type="text", placeholder="Telegram login" aria-label="Telegram login" aria-describedby="login-symbol", value="#{user.telegramLogin}")

                    div.form-group
                        textarea.form-control#address(name="address", cols="40", rows="5", placeholder='Address: city, street, house, zip-code')
                            | #{user.postData.address}
                    div.form-group
                        textarea.form-control#about(name="about", cols="40", rows="10", placeholder='About you')
                            | #{user.about}
                    div.form-group
                        button#submit.btn.btn-main
                            | Save
                        label#reply
 */