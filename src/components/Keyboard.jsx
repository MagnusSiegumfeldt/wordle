import React, { Component } from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { CharState } from '../logic/WordleGame'

const StateMap = {
    [CharState.Correct]: "keyboard-correct",
    [CharState.SemiCorrect]: "keyboard-semicorrect",
    [CharState.Wrong]: "keyboard-wrong",
    [CharState.NotEvaluated]: "keyboard-notevaluated",
}

class Keyboard  extends Component {
    delay = 30;
    constructor(props) {
        super(props);
    }
    layout_da = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p','å'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'æ', 'ø'], ['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']]

    

    render() {
        const keyboard = this.layout_da.map((row, i) => (
            <div key={i} className={"keyboard-row"}>
                {
                    row.map((c, j) => (
                        <div key={j}  className={"keyboard-button-container " + (this.props.letterState[c.toUpperCase()] != CharState.NotEvaluated ? "is-shown" : "")}>
                            <button onClick={() => this.props.handleKeyboardButton(c)} 
                                    className={"keyboard-button " + (c == "Backspace" || c == "Enter" ? "keyboard-button-control " : "") + StateMap[this.props.letterState[c.toUpperCase()]]}>
                                {c == "Backspace" ? <BackspaceIcon fontSize="tiny"/> : c == "Enter" ? <KeyboardReturnIcon fontSize="tiny"/> : c.toUpperCase()}
                            </button>
                            
                        </div>
                    ))
                }
            </div>
        ));
        return (<div className="keyboard-container">
            {keyboard}
        </div>);
    }
}

export default Keyboard;






