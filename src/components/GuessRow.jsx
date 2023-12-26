import React, { Component } from 'react';

import CharBox from './CharBox';



class GuessRow extends Component {
    symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "æ", "ø", "å"]
    
    constructor(props) {
        super(props);
        this.state = {
            colorClasses: ["", "", "", "", ""],
        };
    }

    
    
    render() {
        const divs = Array.from({ length: 5 }, (_, index) => (
            <CharBox 
                handleKeyDown={this.handleKeyDown} 
                key={index} 
                index={index}
                active={this.props.active && Math.min(this.props.content.length, 4) == index}
                content={this.props.content[index]}
                charState={this.props.charState[index]}
                handleClickDelete={this.props.handleClickDelete}
            />
            
        ));
        return <div className={"guess-row" + (this.props.shake ? " shake" : "")}>{divs}</div>;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.complete != this.props.complete && this.props.complete) {
            this.checkWord();
        }
        
    }
    componentDidMount(){
        
    }
}

export default GuessRow;






