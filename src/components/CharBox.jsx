import React, { Component } from 'react';
import { CharState } from '../logic/Enums'


const StateMap = {
    [CharState.Correct]: "charbox-correct",
    [CharState.SemiCorrect]: "charbox-semicorrect",
    [CharState.Wrong]: "charbox-wrong",
    [CharState.NotEvaluated]: "charbox-notevaluated",
}

class CharBox extends Component {
    delay = 45
    

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const index = this.props.index;
        return (
            <div tabIndex={0} style={{ transitionDelay: `${index * this.delay}ms` }} onKeyDown={this.props.handleKeyDown} className={"charbox-container " + (this.props.charState !== CharState.NotEvaluated ? "is-flipped" : "")}>  
                <div className={"charbox charbox-front" + (this.props.active ? " charbox-active" : "")} onClick={() => this.props.handleClickDelete(index)}>
                        {this.props.content}
                </div>
                <div className={"charbox charbox-back " + StateMap[this.props.charState]} >
                    {this.props.content}
                </div>
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.focus !== this.props.focus) {
            if (this.props.focus === this.props.index) {
                this.props.reference.current.focus()
            }
        }
    }
}

export default CharBox;






