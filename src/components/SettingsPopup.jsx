import React, { Component } from 'react';
import { Close } from '@mui/icons-material';
import { Checkbox, Select, MenuItem, FormControl } from '@mui/material';
import { Language } from '../logic/Enums'


class SettingsPopup extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            darkmode: this.props.darkmode,
            hardmode: this.props.hardmode,
            clearCookies: false,
            language: this.props.language,
        }
    }
    handleCheckbox = (index) => {
        if (index === 0) {
            this.props.toggleDarkmode();
        }
        if (index === 1) {
            this.props.toggleHardmode();
        }       
        if (index === 2) {
            this.props.clearCookies();
            this.setState({
                clearCookies: true,
            });
            setTimeout(() => {
                this.setState({
                    clearCookies: false,
                });
            }, 500);
        }   
    }
    handleChange = (event) => {
        this.setState({
            language: event.target.value
        });
        this.props.setLanguage(event.target.value);
    }

    render() {
        return (
            <div onClick={e => e.stopPropagation()} className="popup-container">
                <div className="tutorial-header">Settings</div>
                <div className="settings-row">
                    <FormControl className="language-select-container" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            className="language-select"
                            value={this.state.language}
                            onChange={this.handleChange}
                        >
                            <MenuItem className="language-select-item" value={Language.Danish}>DK</MenuItem>
                            <MenuItem className="language-select-item" value={Language.English}>EN</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="settings-description">Language</div>
                </div>
                <div className="settings-row">
                    { this.props.darkmode === true && <div className="checkbox-background"></div> }
                    <Checkbox
                        checked={this.props.darkmode}
                        onChange={() => this.handleCheckbox(0)}
                        sx={{
                            '&.Mui-checked': {
                                color: "var(--theme-color)",
                            },
                        }}
                    />
                    <div className="settings-description">Dark mode</div>
                </div>
                <div className="settings-row">
                    { this.props.hardmode === true && <div className="checkbox-background"></div> }
                    <Checkbox
                        checked={this.props.hardmode}
                        onChange={() => this.handleCheckbox(1)}
                        sx={{
                            '&.Mui-checked': {
                                color: "var(--theme-color)",
                            },
                        }}
                    />
                    <div className="settings-description">Hard mode</div>
                </div>
                <div className="settings-row">
                    { this.state.clearCookies === true && <div className="checkbox-background"></div> }
                    <Checkbox
                        checked={this.state.clearCookies}
                        onChange={() => this.handleCheckbox(2)}
                        sx={{
                            '&.Mui-checked': {
                                color: "var(--theme-color)",
                            },
                        }}
                    />
                    <div className="settings-description">Clear cookies</div>
                </div>
                <div className="popup-close" onClick={this.props.handleClosePopup}><Close/></div>
            </div>
            
            
        );
    }

}

export default SettingsPopup;