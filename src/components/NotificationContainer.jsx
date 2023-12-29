import React, { Component } from 'react';
import NotificationPopup from './NotificationPopup'

class NotificationContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="notification-container">
                {  
                    this.props.notifications.map((notification, index) => (
                        <NotificationPopup key={index} notification={notification}/>
                    ))
                }    
            </div>
        );
        
    }
}

export default NotificationContainer;






