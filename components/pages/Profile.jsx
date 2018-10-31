import React from 'react'
import Event from "../Event";
import ProfileForm from "../ProfileForm";


export default class Profile extends React.Component {
  render() {
    return (
      <div className='container'>
        <ul id='myTab' className='nav nav-pills' role='tabList'>
          <li className='nav-item'>
            <a id='home-tab' className='nav-link active' data-toggle='tab' href='#home' role='tab'
               aria-controls='home' aria-selected='true'>
              Activities
            </a>
          </li>
          <li className='nav-item'>
            <a id='profile-tab' className='nav-link' data-toggle='tab' href='#profile' role='tab'
               aria-controls='profile' aria-selected='false'>
              My profile
              {(() => {
                // if (this.props.user.postData.fullName === "" || this.props.user.postData.address === "") {
                //     return <span class='badge badge-warning'>!</span>
                // }
                if (this.props.show) {
                  return <span class='badge badge-warning'>!</span>
                }
              })()}
            </a>
          </li>
        </ul>
        <div id='myTabContent' className='tab-content mt-3'>
          <div id='home' className='tab-pane fade show active' role='tabpanel'
               aria-labelledby='home-tab'>
            {this.props.events.map(event => <Event {...event}/>)}
          </div>
          <div id='profile' className='tab-pane fade' role='tabpanel'
               aria-labelledby='profile-tab'>
            <ProfileForm {...this.props.user}/>
          </div>
        </div>
      </div>
    );
  }
}

// export default connect(state => state)(Profile)
/*
extends layout

block content
    .container
        ul.nav.nav-pills#myTab(role="tabList")
            li.nav-item
                a.nav-link.active#home-tab(data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true")
                    | Activities
            li.nav-item
                a.nav-link#profile-tab(data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false")
                    | My profile
                    - if (user.postData.fullName === "" || user.postData.address === "") {
                        span.badge.badge-warning
                            | !
                     - }

        div.tab-content#myTabContent.mt-3
            div.tab-pane.fade.show.active#home(role="tabpanel" aria-labelledby="home-tab")
                  for event in events
                        div.rounded.border.border-secondary.mt-3
                            div.event-header.p-3
                                | #{event.name}
                            div.progress(style="height: 5px")
                                div.progress-bar.bg-secondary(role="progressbar" style="width: #{event.completion}%" aria-valuenow="#{event.completion}" aria-valuemin="0" aria-valuemax="100")
                            div.event-content.p-3
                                - if (event.addressee) {
                                    input.event-id(type="hidden" name="target" value="#{event.id}")
                                    - if (event.showGiftSentMessage) {
                                        div.gift-sended-message.alert.alert-info.fade.show(role="alert")
                                            strong
                                                | Hey!
                                            |  Santa has sent gift to you!
                                            img(src="/images/santa.png")
                                     - }
                                    - if (event.showGiftReceivedMessage) {
                                        div.gift-received-message.alert.alert-info.fade.show(role="alert")
                                            strong
                                                | Hey!
                                            |  Your gift was received!
                                            img(src="/images/gift.png")
                                     - }
                                    div.postcard
                                        div.row
                                            div.col-lg-3.postcard-item-header
                                                | Telegram
                                            div.col-lg-9
                                                | @#{event.addressee.telegramLogin}
                                        div.row
                                            div.col-lg-3.postcard-item-header
                                                | Full Name
                                            div.col-lg-9
                                                | #{event.addressee.fullName}
                                        div.row
                                            div.col-lg-3.postcard-item-header
                                                | Address
                                            div.col-lg-9
                                                | #{event.addressee.address}
                                        div.row
                                            div.col-lg-3.postcard-item-header
                                                | About
                                            div.col-lg-9
                                                | #{event.addressee.about}
                                    div.actions
                                        div.checkbox
                                            label.isSent.custom-control.custom-checkbox
                                                input.custom-control-input(type="checkbox", name="isSent", checked=(event.isGiftSent ? 'checked' : undefined))
                                                span.custom-control-indicator
                                                span.custom-control-description
                                                    | I sent the gift
                                        div.checkbox
                                            label.isReceived.custom-control.custom-checkbox
                                                input.custom-control-input(type="checkbox", name="isSent", checked=(event.isGiftReceived ? 'checked' : undefined))
                                                span.custom-control-indicator
                                                span.custom-control-description
                                                    | I received the gift
                                - } else {
                                    div.empty-postcard
                                        p Nothing here yet!
                                        p You'll get an address at
                                        p
                                            span.sending-date #{event.endDate}
                                - }

            div.tab-pane.fade#profile(role="tabpanel" aria-labelledby="profile-tab")
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

    script(type='text/javascript').
        $("#update-profile-form").submit(function (e) {
            e.preventDefault();
        });

        $('#submit').click(function () {
            var data = {};
            data.fullName = $('#fullName').val();
            data.address = $('#address').val();
            data.about = $('#about').val();
            data.telegramLogin = $('#telegramLogin').val();

            $('#reply').css('opacity', '1').text("Saving...");
            $.post('/update_profile', data, function (result) {
                $('#reply').text("Saved.").delay(2000).animate({opacity:0});

                let badgeExists = $('#profile-tab').find('.badge').length > 0;

                if (!badgeExists && (result.postData.fullName === '' || result.postData.address === '')) {
                    $('#profile-tab').append('<span class="badge badge-warning">!</span>');
                }

                if (badgeExists && result.postData.fullName !== '' && result.postData.address !== '') {
                    $('#profile-tab .badge').remove();
                }
            })
        })

        $('.isSent').click(function () {
            var event = {};
            var checkbox = $(this).find('input');
            event.id = $(this).parents('.event-content').find('.event-id').val();
            event.isGiftSent = checkbox.prop('checked');
            $.post('/update_event', event)
        })

        $('.isReceived').click(function () {
            var event = {};
            var checkbox = $(this).find('input');
            event.id = $(this).parents('.event-content').find('.event-id').val();
            event.isGiftReceived = checkbox.prop('checked');
            $.post('/update_event', event)
        })
 */