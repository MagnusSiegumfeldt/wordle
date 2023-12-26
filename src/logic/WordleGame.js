const GameState = {
	Won: 0,
	Lost: 1,
	Running: 2
}
const CharState = {
    Correct: 0,
    SemiCorrect: 1,
    Wrong: 2,
    NotEvaluated: 3
}

class WordleGame {
    constructor(language) {
        this.language = language;
        this.word = this.getRandomWord(language);
        this.guesses = [];
        this.currentGuess = 0;
        this.maxGuesses = 6;
        this.gamestate = GameState.Running;
        this.charState = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => CharState.NotEvaluated));
        this.letterState = {};
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';

        for (const letter of alphabet) {
            this.letterState[letter] = CharState.NotEvaluated;
        }
    
    }
    getLetterState = () => {
        return this.letterState;
    }
    isGameover = () => {
        return this.gamestate == GameState.Won || this.gamestate == GameState.Lost;
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
    getRandomWord = (language) => {
        const idx = Math.floor(Math.random() * language.length);
        const word = language[idx].toUpperCase();
        console.log(word);
        return word;
    }
    validGuess = (guess) => {
        return this.language.includes(guess.toLowerCase());
    }

    evaluateGuess = (guess) => {
        const word = this.word;
        const seen = new Map();
        const found = Array.from({ length: 5 }, () => false);
        
        // Check correct placements
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] == word[i]) {
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
                    if (this.letterState[guess[i]] != CharState.Correct) {
                        this.letterState[guess[i]] = CharState.SemiCorrect;
                    }
                    this.charState[this.currentGuess][i] = CharState.SemiCorrect;
                } else if (seen.has(guess[i]) && seen.get(guess[i]) < word.split(guess[i]).length - 1) {
                    seen.set(guess[i], seen.get(guess[i]) + 1);
                    if (this.letterState[guess[i]] != CharState.Correct) {
                        this.letterState[guess[i]] = CharState.SemiCorrect;
                    }
                    this.charState[this.currentGuess][i] = CharState.SemiCorrect;
                } else {
                    this.letterState[guess[i]] = CharState.Wrong;
                    this.charState[this.currentGuess][i] = CharState.Wrong;
                }
            } else {
                this.letterState[guess[i]] = CharState.Wrong;
                this.charState[this.currentGuess][i] = CharState.Wrong;
            }
        }
    }
    makeGuess = (guess) => {
        if (!this.validGuess(guess)) {
            return false;
        } 
        this.evaluateGuess(guess);
        if (guess == this.word) {
            this.guesses.push(guess);
            this.gamestate = GameState.Won;
            return true;
        } else {
            this.guesses.push(guess);
            this.currentGuess += 1;
            if (this.currentGuess == 6) {
                this.gamestate = GameState.Lost;
            }
            return true;
        }

    }
    getGuess = (index) => {
        return this.guesses[index];
    }
    getWord = () => {
        return this.word;
    }

}

export { WordleGame, GameState, CharState };