import React from 'react'
import Message from "./Message";
import Postcard from "./Postcard";
import EmptyPostcard from "./EmptyPostcard";
import CheckBox from "./CheckBox";

export default class Event extends React.Component {

    render() {
        return (
            <div className='rounded border border-secondary mt-3' key={this.props.name}>
                <div className='event-header p-3'>
                    {this.props.name}
                </div>
                <ProgressBar completion={this.props.completion}/>
                <div className='event-content p-3'>
                    {(() => {
                        if (this.props.addressee) {
                            let res = [];
                            res.push(<input className='event-id' type='hidden' name='target' value={this.props.id}/>);
                            if (this.props.showGiftSentMessage) {
                                res.push(<Message header='Hey!' content='Santa has sent gift to you!'
                                                image='/images/santa.png'/>);
                            }
                            if (this.props.showGiftReceivedMessage) {
                                res.push(<Message header='Hey!' content='Your gift was received!' image='/images/gift.png'/>);
                            }
                            res.push(<Postcard {... this.props.addressee}/>);
                            res.push(<div className='actions'>
                                <CheckBox name='isSent' title='I sent the gift' checked={this.props.isGiftSent}/>
                                <CheckBox name='isReceived' title='I received the gift' checked={this.props.isGiftReceived}/>
                            </div>);
                            return (<div>{res}</div>);
                        } else {
                            return <EmptyPostcard assignDate={this.props.endDate}/>;
                        }
                    })()}
                </div>
            </div>
        );
    }
}

class ProgressBar extends React.Component {
    render() {
        return (
            <div className='progress' style={{height: '5px'}} key={3333}>
                <div className='progress-bar bg-secondary' role='progressbar'
                     style={{width: this.props.completion + '%'}}
                     aria-valuenow={this.props.completion} aria-valuemin='0' aria-valuemax='100'/>
            </div>
        );
    }
}


/*
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
 */