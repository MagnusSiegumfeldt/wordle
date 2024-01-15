import React, { Component } from 'react';
import GuessRow from './GuessRow'
import Keyboard from './Keyboard'

class Game extends Component {
    render() {
        const { game, word } = this.props;
        const divs = Array.from({ length: 6 }, (_, index) => (
            <GuessRow 
                key={index} 
                content={
                    index === game.getGuessNum() && !game.isGameover() ? word :
                    game.getGuess(index) ? game.getGuess(index) : ""
                }
                active={index === game.getGuessNum()}
                shake={this.props.shake === index}
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






