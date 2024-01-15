import React, { Component } from 'react';
import { GameState } from '../logic/Enums'

class GiveupPopup extends Component {
    render() {
        
        return (
            <div onClick={e => e.stopPropagation()} className="giveup-popup-container">
                <div>Are you sure you want to give up?</div>
                <div>
                    <button onClick={this.props.handleClosePopup} className="popup-button cancel-button">Cancel</button>
                    <button onClick={this.props.handleRestart} className="popup-button giveup-button">Confirm</button>
                </div>
            </div>
            
        )
    }
}

export default GiveupPopup;






