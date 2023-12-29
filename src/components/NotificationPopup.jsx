import React, { Component } from 'react';

import { ErrorType, Notification } from '../logic/Enums'

class NotificationPopup extends Component {
    render() {
        return (<div className="notification">{ 
            this.props.notification === ErrorType.NotWord ? "not a known word" :
            this.props.notification === ErrorType.Length ? "not enough letters" : 
            this.props.notification === ErrorType.CorrectNotSet ? "correct letters not set" :
            this.props.notification === ErrorType.WrongSet ? "wrong letters used" : 
            this.props.notification === ErrorType.SemiCorrectSet ? "semi correct letter in wrong spot" : 
            this.props.notification === ErrorType.SemiCorrectNotSet ? "semi correct letter not used" :
            this.props.notification === Notification.HardmodeEnableError ? "cannot toggle hardmode during game" :
            this.props.notification === Notification.HardmodeEnabled ? "hardmode enabled" :
            this.props.notification === Notification.HardmodeDisabled ? "harmode disabled" :
            this.props.notification === Notification.CookiesReset ? "cookies removed" : 
            this.props.notification === Notification.LanguageEnable ? "cannot change language during game" : 
            "something went wrong"
        }</div>);
    }
}

export default NotificationPopup;






