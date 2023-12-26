import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import Checkbox from '@mui/material/Checkbox';

class SettingsPopup extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            checkbox: (this.props.colorTheme == "dark"),
        }
        
    }
    handleCheckbox = () => {
        this.setState({
            checkbox: !this.state.checkbox,
        });
        this.props.changeColorTheme();
        
    }

    render() {
        return (
            <div className="popup-container">
                <div className="tutorial-header">Settings</div>
                <div className="settings-row">
                    {this.props.colorTheme == "dark" && <div className="checkbox-background"></div>}
                    <Checkbox
                        checked={this.state.checkbox}
                        onChange={this.handleCheckbox}
                        sx={{
                            '&.Mui-checked': {
                                color: "var(--theme-color)",
                            },
                        }}
                    />
                    <div className="settings-description">Dark mode</div>
                </div>
                <div className="popup-close" onClick={this.props.handleClosePopup}><CloseIcon/></div>
            </div>
            
            
        );
    }

}

export default SettingsPopup;