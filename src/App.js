import React, { Component } from 'react';

import Game from './components/Game'
import Header from './components/Header'
import SettingsPopup from './components/SettingsPopup'
import TutorialPopup from './components/TutorialPopup'
import GameoverPopup from './components/GameoverPopup'
import StatisticsPopup from './components/StatisticsPopup'
import NotificationContainer from './components/NotificationContainer'

import { CookieHelper } from './logic/CookieHelper'
import { WordleGame } from './logic/WordleGame'
import { ErrorType, GameState, Notification } from './logic/Enums'



import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import './styles/App.css';
import './styles/Grid.css';
import './styles/Keyboard.css';
import './styles/Gameover.css';
import './styles/Tutorial.css';
import './styles/Settings.css';
import './styles/Popup.css';
import './styles/Header.css';



const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

class App extends Component {
	constructor(props) {
		super(props);

		this.gameRef = React.createRef();
		
		const darkmode 		= CookieHelper.getDarkmode();
		const hardmode 		= CookieHelper.getHardmode();
		const tutorialPopup = CookieHelper.getShowTutorial();
        const stats 		= CookieHelper.getStats();
		const language 		= CookieHelper.getLanguage();
		
		const body = document.querySelector('body');
		body.classList.add(darkmode ? "dark" : "light");
		
		
		const game = new WordleGame(language, hardmode);
		
		this.state = {
			currentGuess: [],
			settingsPopup: false,
			tutorialPopup,
			statisticsPopup: false,
			gameoverPopup: false,
			darkmode,
			hardmode,
			game,
			stats,
			shake: -1,
			notifications: [],
			language
		};
	}
	createNotification = (notification) => {
		let { notifications } = this.state;
		notifications.push(notification);
		this.setState({
			notifications,
		});
		
		setTimeout(() => {
			notifications.shift();
			this.setState({
				notifications,
			});
		}, 1200);
	}
	handleClosePopup = () => {
		this.setState({
			settingsPopup: false,
			tutorialPopup: false,
			statisticsPopup: false,
		});
		this.gameRef.current.focus();
	}
	componentDidMount() {
		this.gameRef.current.focus();
	}
	toggleDarkmode = () => {
		const { darkmode } = this.state;
		const body = document.querySelector('body');
		if (this.state.darkmode) {
			body.classList.add("light");
			body.classList.remove("dark");
		} else {
			body.classList.add("dark");
			body.classList.remove("light");
		}
		this.setState({
			darkmode: !darkmode,
		});
		CookieHelper.setDarkmode(!darkmode);
		
	}
	toggleHardmode = () => {
		
		const error = this.state.game.toggleHardmode();
		if (error !== ErrorType.None) {
			this.createNotification(error);
			return;
		} 
		const hardmode  = this.state.game.getHardmode();
		this.setState({
			hardmode: hardmode,
		});
		CookieHelper.setHardmode(hardmode);
		const notification = (hardmode ? Notification.HardmodeEnabled : Notification.HardmodeDisabled);
		this.createNotification(notification);
	}
	handleStatisticsClick = () => {
		this.setState({
			statisticsPopup: !this.state.statisticsPopup
		});
	}
	
	makeGuess = (guess) => {
		let { game, stats } = this.state;
		const error = game.makeGuess(guess);
		if (error !== ErrorType.None) {
			this.createNotification(error);
			return error;
		}
		if (game.getGameState() === GameState.Won) {
			stats.score[game.getGuessNum()] += 1;
			stats.games += 1;
			stats.wins += 1;
			stats.currentStreak += 1;
			if (stats.currentStreak > stats.bestStreak) {
				stats.bestStreak = stats.currentStreak;
			}
			setTimeout(() => {
				this.setState({
					gameoverPopup: true,
				});
			}, 600);
			CookieHelper.setStats(stats);
			
		} else if (game.getGameState() === GameState.Lost) {
			stats.games += 1;
			stats.currentStreak = 0;
			setTimeout(() => {
				this.setState({
					gameoverPopup: true,
				});
			}, 600);
			CookieHelper.setStats(stats);
		} 
		this.setState({
			game,
			stats,
		});
		
		return error;
	}

	handleDontShow = () => {
		const tutorialPopup = false;
		CookieHelper.setShowTutorial(true);
		
		this.setState({
			tutorialPopup,
		});
		this.gameRef.current.focus();
	}
	togglePopup = (event, popup) => {
		event.stopPropagation()
		this.setState({
			tutorialPopup:   (popup === "tutorial"     && !this.state.tutorialPopup  ),
			settingsPopup:   (popup === "settings"     && !this.state.settingsPopup  ),
			statisticsPopup: (popup === "statistics"   && !this.state.statisticsPopup),
		});
		this.gameRef.current.focus();
	}
	handleSettingsClick = () => {
		this.setState({
			settingsPopup: !this.state.settingsPopup,
		});
	}
	handleOutsideClick = () => {
		if (this.state.settingsPopup || this.state.tutorialPopup || this.state.statisticsPopup) {
			this.setState({
				settingsPopup: false,
				tutorialPopup: false,
				statisticsPopup: false,
			});
		}
		
	}
	handleTutorialClick = () => {
		this.setState({
			tutorialPopup: !this.state.tutorialPopup,
		});
	}
	handleRestart = () => {
        const game = new WordleGame(this.state.language, this.state.hardmode);
		this.setState({
			game, 
			currentGuess: [],
			gameoverPopup: false
		});
		
		this.gameRef.current.focus();
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
        let { currentGuess } = this.state;
        let { game, stats } = this.state;
        if (input === "BACKSPACE") {
            if (currentGuess.length > 0) {
                currentGuess.pop();
            }
        } else if (input === "ENTER") {
            if (currentGuess.length === 5) {
				const error = this.makeGuess(currentGuess.join(""));
                if (error === ErrorType.None) {
                    currentGuess = [];
                } else {
                    this.shakeRow(game.getGuessNum());
                }
            } else {
                if (game.isGameover()) {
                    this.handleRestart();
                    return;
                } else {
                    
                    this.shakeRow(game.getGuessNum());
                    this.createNotification(ErrorType.Length);
                }
            }
        } else if (input === " ") {
            if (game.isGameover()) {
                this.handleRestart();
                return;
            } 
        } else if (currentGuess.length < 5 && alphabet.includes(input)) {
            currentGuess.push(input);
        }
        this.setState({
            currentGuess,
            game,
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
	clearCookies = () => {
		CookieHelper.clear();
		this.createNotification(Notification.CookiesReset)
	}

	setLanguage = (language) => {
		const error = this.state.game.setLanguage(language)
		if (error !== ErrorType.None) {
			this.createNotification(error);
			return;
		} 
		this.setState({
			language,
		});
		CookieHelper.setLanguage(language);
	}

	render() {
		return (
			<div tabIndex={-1} ref={this.gameRef} onClick={this.handleOutsideClick} className="app" onKeyDown={event => this.processInput(event.key)}>
				<Header togglePopup={this.togglePopup} toggleHardmode={this.toggleHardmode} hardmode={this.state.game.getHardmode()} language={this.state.language}/>
				<Game 
					shake={this.state.shake}
					handleClickDelete={this.handleClickDelete} 
					game={this.state.game} 
					word={this.state.currentGuess.join("")} 
					processInput={this.processInput}
				/>
				{ this.state.gameoverPopup   && <GameoverPopup stats={this.state.stats} game={this.state.game} handleRestart={this.handleRestart}/> }
				{ this.state.settingsPopup   && 
					<SettingsPopup 
						handleClosePopup={this.handleClosePopup} 
						hardmode={this.state.game.getHardmode()} 
						toggleHardmode={this.toggleHardmode} 
						darkmode={this.state.darkmode}
						toggleDarkmode={this.toggleDarkmode} 
						clearCookies={this.clearCookies}
						language={this.state.language}
						setLanguage={this.setLanguage}
					/> 
				}
				{ this.state.tutorialPopup   && <TutorialPopup handleDontShow={this.handleDontShow} handleClosePopup={this.handleClosePopup}/> }
				{ this.state.statisticsPopup && <StatisticsPopup stats={this.state.stats} handleClosePopup={this.handleClosePopup}/> }
				{ this.state.notifications.length > 0 && <NotificationContainer notifications={this.state.notifications} /> }
			</div>
		);
	}

}

export default App;
