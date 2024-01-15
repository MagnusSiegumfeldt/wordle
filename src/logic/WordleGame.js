import { ErrorType, GameState, CharState, Language, Notification } from './Enums'

import englishWordList from '../assets/english_word_list.json'
import englishAnswerList from '../assets/english_answer_list.json'
import danishWordList from '../assets/danish_word_list.json'
import danishAnswerList from '../assets/danish_answer_list.json'

class WordleGame {
    constructor(language, hardmode) {
        this.answerlist = this.getAnswerList(language);
        this.wordlist = this.getWordList(language);
        this.word = this.getRandomWord(this.answerlist);
        this.guesses = [];
        this.currentGuess = 0;
        this.maxGuesses = 6;
        this.gamestate = GameState.Running;
        this.charState = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => CharState.NotEvaluated));
        this.letterState = {};
        this.hardmode = hardmode;
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';

        for (const letter of alphabet) {
            this.letterState[letter] = CharState.NotEvaluated;
        }
    
    }
    setLanguage = (language) => {
        if (this.currentGuess === 0) {
            this.language = language;
            this.answerlist = this.getAnswerList(language);
            this.wordlist = this.getWordList(language);
            this.word = this.getRandomWord(this.answerlist);
            return ErrorType.None;
        }
        return Notification.LanguageEnable;
    }
    getWordList = (language) => {
        if (language === Language.English) {
            return englishWordList;
        }
        if (language === Language.Danish) {
            return danishWordList;
        }
    }
    getAnswerList = (language) => {
        if (language === Language.English) {
            return englishAnswerList;
        }
        if (language === Language.Danish) {
            return danishAnswerList;
        }
    }
    getHardmode = () => {
        return this.hardmode;
    }
    toggleHardmode = () => {
        if (this.currentGuess === 0) {
            this.hardmode = !this.hardmode;
            return ErrorType.None;
        }
        return Notification.HardmodeEnableError;
    }

    getLetterState = () => {
        return this.letterState;
    }
    isGameover = () => {
        return this.gamestate === GameState.Won || this.gamestate === GameState.Lost;
    }
    getGameState = () => {
        return this.gamestate;
    }

    getCharState = () => {
        return this.charState;
    }

    getGuessNum = () => {
        return this.currentGuess;
    }
    getRandomWord = (answerlist) => {
        const idx = Math.floor(Math.random() * answerlist.length);
        const word = answerlist[idx].toUpperCase();
        console.log(word);
        return word;
    }
    validGuess = (guess) => {
        if (!this.wordlist.includes(guess.toLowerCase())) {
            return ErrorType.NotWord;
        }
        if (this.hardmode) {
            const resultRow = this.currentGuess - 1;
            if (resultRow === -1) {
                return ErrorType.None;
            }

            // Check all correct letters are set
            for (let i = 0; i < this.guesses[resultRow].length; i++) {
                if (this.charState[resultRow][i] === CharState.Correct && guess[i] !== this.guesses[resultRow][i]) {
                    //console.log(`${i + 1} must be ${this.guesses[resultRow][i]}`);
                    return ErrorType.CorrectNotSet;
                }
            }
            // Check all semicorrect are not same place
            for (let i = 0; i < this.guesses.length; i++) {
                for (let j = 0; j < this.guesses[i].length; j++) {
                    if (this.charState[i][j] === CharState.SemiCorrect && guess[j] === this.guesses[i][j]) {
                        //console.log(`${j + 1} must not be ${this.guesses[i][j]}`);
                        return ErrorType.SemiCorrectSet;
                    }
                }                    
            }

            // Check all semicorrect are included
            for (let i = 0; i < this.guesses.length; i++) {
                for (let j = 0; j < this.guesses[i].length; j++) {
                    let min = 0
                    let maxfound = false
                    // For every char in all guesses, count occurences in that guess, and check that the new guess contains at minimum the number of correct and semicorrect and no higher than the maximum if a wrong is set.
                    for (let k = 0; k < this.guesses[i].length; k++) {
                        if (this.guesses[i][k] === this.guesses[i][j] && (this.charState[i][k] === CharState.SemiCorrect || this.charState[i][k] === CharState.Correct)) {
                            min += 1;
                        } else if (this.guesses[i][k] === this.guesses[i][j] && (this.charState[i][k] === CharState.Wrong)) {
                            maxfound = true
                        }
                    }
                    let max = maxfound ? min : 5;
                    let found = 0
                    for (let k = 0; k < guess.length; k++) {
                        if (guess[k] === this.guesses[i][j]) {
                            found += 1
                        }
                    }
                    if (found < min) {
                        return ErrorType.SemiCorrectNotSet;
                    }
                    if (found > max) {
                        return ErrorType.WrongSet
                    }
                }                    
            }
        }
        return ErrorType.None;
    }

    evaluateGuess = (guess) => {
        const word = this.word;
        const seen = new Map();
        const found = Array.from({ length: 5 }, () => false);
        
        // Check correct placements
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === word[i]) {
                this.charState[this.currentGuess][i] = CharState.Correct;
                this.letterState[guess[i]] = CharState.Correct;
                seen.set(guess[i], seen.has(guess[i]) ? seen.get(guess[i]) + 1 : 1);
                found[i] = true;
            } 
        }
        for (let i = 0; i < guess.length; i++) {
            if (found[i]) {  
                continue;
            }
            if (word.includes(guess[i])) {
                if (!seen.has(guess[i])) {
                    seen.set(guess[i], 1);
                    if (this.letterState[guess[i]] !== CharState.Correct) {
                        this.letterState[guess[i]] = CharState.SemiCorrect;
                    }
                    this.charState[this.currentGuess][i] = CharState.SemiCorrect;
                } else if (seen.has(guess[i]) && seen.get(guess[i]) < word.split(guess[i]).length - 1) {
                    seen.set(guess[i], seen.get(guess[i]) + 1);
                    if (this.letterState[guess[i]] !== CharState.Correct) {
                        this.letterState[guess[i]] = CharState.SemiCorrect;
                    }
                    this.charState[this.currentGuess][i] = CharState.SemiCorrect;
                } else {
                    if (this.letterState[guess[i]] !== CharState.Correct && this.letterState[guess[i]] !== CharState.SemiCorrect) {
                        this.letterState[guess[i]] = CharState.Wrong;
                    }
                    this.charState[this.currentGuess][i] = CharState.Wrong;
                }
            } else {
                this.letterState[guess[i]] = CharState.Wrong;
                this.charState[this.currentGuess][i] = CharState.Wrong;
            }
        }
    }
    makeGuess = (guess) => {
        const error = this.validGuess(guess);
        if (error !== ErrorType.None) {
            return error;
        } 
        this.evaluateGuess(guess);
        this.guesses.push(guess);
        if (guess === this.word) {
            this.gamestate = GameState.Won;
        } else {
            this.currentGuess += 1;
            if (this.currentGuess === 6) {
                this.gamestate = GameState.Lost;
            }
        }
        console.log(this.guesses)
        return ErrorType.None;
    }
    getGuess = (index) => {
        return this.guesses[index];
    }
    getWord = () => {
        return this.word;
    }
    giveup = () => {
        this.gamestate = GameState.Lost; 
    }

}

export { WordleGame };