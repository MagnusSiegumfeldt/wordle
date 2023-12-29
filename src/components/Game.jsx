import React, { Component } from 'react';
import Cookies from 'js-cookie';




import GuessRow from './GuessRow'
import Keyboard from './Keyboard'




const ErrorType = {
    None: 0,
    NotWord: 1,
    Length: 2
};

class Game extends Component {
    
    constructor(props) {
        super(props);

    }

  

    render() {
        const { game, word } = this.props;
        
        const divs = Array.from({ length: 6 }, (_, index) => (
            <GuessRow 
                key={index} 
                content={
                    index < game.getGuessNum() ? game.getGuess(index) :
                    index == game.getGuessNum() && game.isGameover() ? game.getGuess(index) :
                    index == game.getGuessNum() ? word :
                    ""}
                active={index == game.getGuessNum()}
                shake={this.props.shake == index}
                charState={game.getCharState()[index]} 
                word={game.getWord()}
                handleClickDelete={this.props.handleClickDelete}
            />            
        ));

        return (<div className="game-container">
            <div className="game-container-inner">
                {divs}
            </div>
            <Keyboard handleKeyboardButton={this.props.processInput} letterState={game.getLetterState()}/>
        </div>);
    }
}

export default Game;






