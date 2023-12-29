import React, { Component } from 'react';
import { GameState } from '../logic/Enums'

class GameoverPopup extends Component {
    render() {
        const game = this.props.game;
        const { score, games, wins, currentStreak, bestStreak } = this.props.stats;
        const total = score.reduce((a, c) => a + c, 0);
        const widths = score.map(x => (x * 1.0 / total))
        return (
            <div onClick={e => e.stopPropagation()} className="popup-container">
                {game.getGameState() === GameState.Won ? (
                    <p className="gameover-header">You guessed{"\n" + game.getWord() + "\n"}in { game.getGuessNum() + 1 } attempts</p>
                ) : (
                    <p className="gameover-header">You did not guess{"\n" + game.getWord() + "\n"}in { game.getGuessNum() } attempts</p>
                )}
                <div className={"statistics-container"}>
                <div className={"winrate-container"}>
                    <div>
                        <div className="statistic-label"> { games }</div>
                        <div className="statistic-description">games</div>
                    </div>
                    <div>
                        <div className="statistic-label">  { Math.round(wins * 1.0 / games * 100) + "%" }</div>
                        <div className="statistic-description">winrate</div>
                    </div> 
                    <div>
                        <div className="statistic-label"> { currentStreak } </div>
                        <div className="statistic-description">current streak</div>
                    </div> 
                    <div>
                        <div className="statistic-label"> { bestStreak }</div>
                        <div className="statistic-description">best streak</div>
                    </div>
                </div>
                <div className={"chart-container"}>  
                    <p className={"chart-header"}>Guess Distribution</p>
                    { 
                        widths.map((x, i) => (
                            <div key={i} className="bar-container">
                                <div className="bar-label-container"><p className="bar-label">{ i + 1 }</p></div>
                                <div style={{width: "calc(" + x * 81 + "% + 10px)" }} className={"bar" + (game.getGuessNum() === i ? " bar-guess" : "")}>{ score[i] }</div>
                            </div>
                        ))     
                    }
                </div>
            </div>
                <button className="gameover-restart-button" onClick={this.props.handleRestart}>Play again</button>
            </div>
            
        )
    }
}

export default GameoverPopup;






