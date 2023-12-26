import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Game from './components/Game'
import Header from './components/Header'
import SettingsPopup from './components/SettingsPopup'
import TutorialPopup from './components/TutorialPopup'
import GameoverPopup from './components/GameoverPopup'
import StatisticsPopup from './components/StatisticsPopup'

import { CookieHelper } from './logic/CookieHelper'
import { WordleGame, GameState, CharState } from './logic/WordleGame'
import danish from './assets/danish.json'

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

class App extends Component {
	constructor(props) {
		super(props);
		
		const game = new WordleGame(danish);
		
		this.gameRef = React.createRef();

		const colorThemeCookie = Cookies.get('colorTheme');
		let colorTheme = colorThemeCookie;
		if (!colorThemeCookie) {
			colorTheme = "dark";
		}
		const body = document.querySelector('body');
		body.classList.add(colorTheme);
		
		const tutorialPopupString = Cookies.get('tutorialPopup');
		const tutorialPopup = CookieHelper.parseTutorialString(tutorialPopupString);
		
		const statString = Cookies.get('stats');
        const stats = CookieHelper.parseStats(statString);

		this.gameRef = React.createRef();
		this.state = {
			settingsPopup: false,
			tutorialPopup,
			statisticsPopup: false,
			gameoverPopup: false,
			colorTheme,
			game: game,
			stats,
		};
	}
	handleClosePopup = () => {
		this.setState({
			settingsPopup: false,
			tutorialPopup: false,
			statisticsPopup: false,
		});
		this.gameRef.current.focus();
	}

	changeColorTheme = () => {
		const body = document.querySelector('body');
		if (this.state.colorTheme == "dark") {
			body.classList.add("light");
			body.classList.remove("dark");
		} else {
			body.classList.add("dark");
			body.classList.remove("light");
		}
		const newTheme = this.state.colorTheme == "dark" ? "light" : "dark";
		this.setState({
			colorTheme: newTheme,
		});
		Cookies.set('colorTheme', newTheme);
	}

	handleStatisticsClick = () => {
		this.setState({
			statisticsPopup: !this.state.statisticsPopup
		});
	}
	makeGuess = (guess) => {
		let { game, stats } = this.state;
		const validGuess = game.makeGuess(guess);
		if (!validGuess) {
			return false;
		}
		if (game.getGameState() == GameState.Won) {
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
			}, 600)
			
		} else if (game.getGameState() == GameState.Lost) {
			stats.games += 1;
			stats.currentStreak = 0;
			setTimeout(() => {
				this.setState({
					gameoverPopup: true,
				});
			}, 600)
		} 
		this.setState({
			game,
			stats,
		});
		return true;
	}

	handleDontShow = () => {
		const tutorialPopup = false;
		Cookies.set('tutorialPopup', 1);
		this.setState({
			tutorialPopup,
		});
		this.gameRef.current.focus();
	}
	togglePopup = (popup) => {
		this.setState({
			tutorialPopup:   (popup == "tutorial"     && !this.state.tutorialPopup  ),
			settingsPopup:   (popup == "settings"     && !this.state.settingsPopup  ),
			statisticsPopup: (popup == "statistics"   && !this.state.statisticsPopup),
		});
		this.gameRef.current.focus();
	}
	handleSettingsClick = () => {
		this.setState({
			settingsPopup: !this.state.settingsPopup,
		});
	}
	handleOutsideClick = () => {
		if (this.state.settingsPopup || this.state.tutorialPopup) {
			this.setState({
				settingsPopup: false,
				tutorialPopup: false,
			});
		}
	}
	handleTutorialClick = () => {
		this.setState({
			tutorialPopup: !this.state.tutorialPopup,
		});
	}
	handleRestart = () => {
        const game = new WordleGame(danish);
		this.setState({
			game, 
			currentGuess: [],
			gameoverPopup: false
		});
		
		this.gameRef.current.focus();
    }
	render() {
		return (
			<div className="app">
				<Header togglePopup={this.togglePopup}/>
				<Game gameRef={this.gameRef} game={this.state.game} handleOutsideClick={this.handleOutsideClick} makeGuess={this.makeGuess} handleRestart={this.handleRestart}/>
				{ this.state.gameoverPopup   && <GameoverPopup stats={this.state.stats} game={this.state.game} handleRestart={this.handleRestart}/> }
				{ this.state.settingsPopup   && <SettingsPopup handleClosePopup={this.handleClosePopup} changeColorTheme={this.changeColorTheme} colorTheme={this.state.colorTheme}/> }
				{ this.state.tutorialPopup   && <TutorialPopup handleDontShow={this.handleDontShow} handleClosePopup={this.handleClosePopup}/> }
				{ this.state.statisticsPopup && <StatisticsPopup stats={this.state.stats} handleClosePopup={this.handleClosePopup}/> }
				
			</div>
		);
	}

}

export default App;
