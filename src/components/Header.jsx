import React, { Component } from 'react';

import { HelpOutline, Leaderboard, Settings, LocalFireDepartment, EmojiFlags } from '@mui/icons-material';
import { Language } from '../logic/Enums'

class Header extends Component {
    render() {
        return (
            <div className='app-header'>
                <div className='header-container'>
                    <div className='left-header'>
                        
                    </div>
                    <div className='logo'>
                        <h1>Wordle</h1>
                    </div>
                    <div className='right-header'>
                        <div className='non-clickable-icon'>
                            <div className="language-icon">
                                {
                                    this.props.language === Language.Danish ? "DK" : 
                                    this.props.language === Language.English ? "EN" : 
                                    "Err."
                                }
                            </div>
                        </div>
                        <div className='icon icon-hoverable' onClick={() => this.props.toggleHardmode()}>
                           <LocalFireDepartment className={this.props.hardmode ? "hardmode-activated" : "hardmode-deactivated"} style={{marginTop: "3px" }} fontSize="medium"/>
                        </div>
                        <div className='icon icon-hoverable' onClick={(e) => this.props.togglePopup(e, "statistics")}>
                            <Leaderboard fontSize="medium"/>
                        </div>
                        <div className='icon icon-hoverable' onClick={(e) => this.props.togglePopup(e, "tutorial")}>
                            <HelpOutline fontSize="medium"/>
                        </div>
                        <div className='icon icon-hoverable' onClick={(e) => this.props.togglePopup(e, "giveup")}>
                            <EmojiFlags fontSize="medium"/>
                        </div>
                        <div className='icon icon-hoverable' onClick={(e) => this.props.togglePopup(e, "settings")}>
                            <Settings fontSize="medium"/>
                        </div>
                    </div>
                    
                </div>
                
            </div>



        )
    }

    

    componentDidMount(){
        
    }
}

export default Header;






