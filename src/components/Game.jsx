import React, { Component } from 'react';
import Cookies from 'js-cookie';

import { WordleGame, GameState, CharState } from '../logic/WordleGame'
import danish from '../assets/danish.json'

import GuessRow from './GuessRow'
import Keyboard from './Keyboard'




import { CookieHelper } from '../logic/CookieHelper'

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

const ErrorType = {
    None: 0,
    NotWord: 1,
    Length: 2
};

class Game extends Component {
    
    constructor(props) {
        super(props);

        this.gameRef = React.createRef();

        this.state = {
            currentGuess: [],
            error: ErrorType.None,
            shake: -1,
        };
    }

    shakeRow = (rowIndex) => {
        this.setState({
            shake: rowIndex
        });
        setTimeout(() => {
            this.setState({
                shake: -1
            });
        }, 400);
    }
    
    
    processInput = (input) => {
        input = input.toUpperCase();
        let { currentGuess, error } = this.state;
        let { game, stats } = this.props;
        if (input == "BACKSPACE") {
            if (currentGuess.length > 0) {
                currentGuess.pop();
            }
        } else if (input == "ENTER") {
            if (currentGuess.length == 5) {
                if (this.props.makeGuess(currentGuess.join(""))) {
                    currentGuess = [];
                } else {
                    error = ErrorType.NotWord;
                    this.shakeRow(game.getGuessNum());
                }
            } else {
                if (game.isGameover()) {
                    this.props.handleRestart();
                    return;
                } else {
                    
                    this.shakeRow(game.getGuessNum());
                    error = ErrorType.Length
                }
            }
        } else if (input == " ") {
            if (game.isGameover()) {
                this.props.handleRestart();
                return;
            } 
        } else if (currentGuess.length < 5 && alphabet.includes(input)) {
            currentGuess.push(input);
        }
        this.setState({
            currentGuess,
            game,
            error,
            stats,
        });
        
    }

    

    handleClickDelete = (index) => {
        let { currentGuess } = this.state;
        while (index < currentGuess.length) {
            currentGuess.pop();
        }
        this.setState({
            currentGuess
        });
    }

    
    onKeyDown = (event) => {
        this.processInput(event.key)
    }
    componentDidMount() {
        this.props.gameRef.current.focus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.error && this.state.error) {
            setTimeout(() => {
                this.setState({
                    error: false
                });
            }, 1200);
        }        
    }
    clearStats = () => {
        Cookies.remove('stats');
        Cookies.remove('tutorialPopup');
        this.setState({
            stats: {
                score: [0, 0, 0, 0, 0, 0],
                games: 0,
                wins: 0,
                currentStreak: 0,
                bestStreak: 0,
            } 
        });
    }
    

    render() {
        const { game } = this.props;
        const word = this.state.currentGuess.join("");
        const divs = Array.from({ length: 6 }, (_, index) => (
            <GuessRow 
                key={index} 
                content={
                    index < game.getGuessNum() ? game.getGuess(index) :
                    index == game.getGuessNum() && game.isGameover() ? game.getGuess(index) :
                    index == game.getGuessNum() ? this.state.currentGuess :
                    ""}
                active={index == game.getGuessNum()}
                shake={this.state.shake == index}
                charState={game.getCharState()[index]} 
                word={game.getWord()}
                handleClickDelete={this.handleClickDelete}
            />            
        ));

        const errorPopup = (
            <div className="notword-container">
                {
                    this.state.error == ErrorType.Length ? "Word is too short" : 
                    this.state.error == ErrorType.NotWord ? word + " is not a word" : 
                    "Something went wrong"
                }
            </div>
        );

        return (<div tabIndex={0} ref={this.props.gameRef} className="game-container" onClick={this.props.handleOutsideClick} onKeyDown={event => this.onKeyDown(event)}>
            <div className="game-container-inner">
                {divs}
            </div>
            <Keyboard handleKeyboardButton={this.processInput} letterState={game.getLetterState()}/>
            
            { this.state.error != ErrorType.None && errorPopup }
            
            <button onClick={this.clearStats}></button>
        </div>);
    }
}

export default Game;






