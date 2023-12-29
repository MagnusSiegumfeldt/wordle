import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';

class TutorialPopup extends Component {
    render() {
        return (
            <div onClick={e => e.stopPropagation()} className="popup-container">
                <div className="tutorial-header">How to play WORDLE</div>
                <div className="popup-description">Guess the word in 6 tries. Each guess must be a valid 5-letter word.</div>
                <div className="tutorial-example-container">
                    <div className="tutorial-example-row">
                        <div className="tutorial-example-charbox">H</div>
                        <div className="tutorial-example-charbox">O</div>
                        <div className="tutorial-example-charbox tutorial-example-charbox-correct">U</div>
                        <div className="tutorial-example-charbox">S</div>
                        <div className="tutorial-example-charbox">E</div>
                    </div>
                    <div className="tutorial-example-description">
                        The letter <b>U</b> is in the correct spot.
                    </div>
                    <div className="tutorial-example-row">
                        <div className="tutorial-example-charbox">G</div>
                        <div className="tutorial-example-charbox">R</div>
                        <div className="tutorial-example-charbox">I</div>
                        <div className="tutorial-example-charbox tutorial-example-charbox-semicorrect">N</div>
                        <div className="tutorial-example-charbox">D</div>
                    </div>
                    <div className="tutorial-example-description">
                        The letter <b>N</b> is in the word but in the wrong spot.
                    </div>
                    <div className="tutorial-example-row">
                        <div className="tutorial-example-charbox">S</div>
                        <div className="tutorial-example-charbox tutorial-example-charbox-wrong">T</div>
                        <div className="tutorial-example-charbox">U</div>
                        <div className="tutorial-example-charbox">N</div>
                        <div className="tutorial-example-charbox">T</div>
                    </div>
                    <div className="tutorial-example-description">
                        The letter <b>T</b> is not in the word.
                    </div>                    
                </div>
                <div className="tutorial-dont-show-container" ><div className="tutorial-dont-show" onClick={this.props.handleDontShow}>Don't show again.</div></div>
                <div className="popup-close" onClick={this.props.handleClosePopup} ><CloseIcon/></div>
                
            </div>
            
        )
    }

}

export default TutorialPopup;






