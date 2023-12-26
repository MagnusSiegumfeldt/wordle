import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';

class StatisticsPopup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const game = this.props.game;
        const { score, games, wins, currentStreak, bestStreak } = this.props.stats;
        const total = score.reduce((a, c) => a + c, 0);
        const widths = score.map(x => (x * 1.0 / total))
        const winrate = games > 0 ? Math.round(wins * 1.0 / games * 100) : 0;
        return (
            <div className="popup-container">
                <div className="tutorial-header">Statistics</div>
                <div className={"statistics-container"}>
                    <div className={"winrate-container"}>
                        <div>
                            <div className="statistic-label"> { games }</div>
                            <div className="statistic-description">games</div>
                        </div>
                        <div>
                            <div className="statistic-label">  { winrate + "%" }</div>
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
                                    <div style={{width: "calc(" + x * 81 + "% + 10px)" }} className={"bar" + (this.props.guess == i ? " bar-guess" : "")}>{ score[i] }</div>
                                </div>
                            ))     
                        }
                    </div>
                </div>
                <div className="popup-close" onClick={this.props.handleClosePopup}><CloseIcon/></div>
            </div>
            
        )
    }

    
    componentDidMount(){
        
    }
}

export default StatisticsPopup;






