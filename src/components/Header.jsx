import React, { Component } from 'react';

import { HelpOutline, Leaderboard, Settings } from '@mui/icons-material';
class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <header className='app-header'>
                <div className='header-container'>
                    <div className='left-header'></div>
                    <div className='logo'>
                        <h1>Wordle</h1>
                    </div>
                    <div className='right-header'>
                        <div className='icon' onClick={() => this.props.togglePopup("statistics")}>
                           
                            <Leaderboard fontSize="medium"/>

                        </div>
                        <div className='icon' onClick={() => this.props.togglePopup("tutorial")}>
                            <HelpOutline fontSize="medium"/>
                        </div>
                        <div className='icon' onClick={() => this.props.togglePopup("settings")}>
                            <Settings fontSize="medium"/>
                        </div>
                    </div>
                    
                </div>
            </header>



        )
    }

    

    componentDidMount(){
        
    }
}

export default Header;






