import Cookies from 'js-cookie';
import { Language } from './Enums';


class CookieHelper {

    static getStats = () => {
        const statString = Cookies.get('stats');
        let score, games, wins, currentStreak, bestStreak;
        if (statString) {
            const stats = statString.split(",").map(x => parseInt(x));
            score = stats.slice(0, 6);
            games = stats[6];
            wins = stats[7];
            currentStreak = stats[8];
            bestStreak = stats[9];
        } else {
            score = [0, 0, 0, 0, 0, 0];
            games = 0;
            wins = 0; 
            currentStreak = 0;
            bestStreak = 0;
        }
        return {
            score,
            games, 
            wins, 
            currentStreak,
            bestStreak,
        };
    }
    static setStats = (stats) => {
        Cookies.set('stats', stats.score + "," + stats.games + "," + stats.wins + "," + stats.currentStreak + "," + stats.bestStreak);
    }
    static getShowTutorial = () => {
        const tutorialPopupString = Cookies.get('tutorial');
        return tutorialPopupString != "true";
    }
    static setShowTutorial = () => {
        Cookies.set('tutorial', true);
    }
    static getHardmode = () => {
        const hardmodeString = Cookies.get('hardmode');
        return hardmodeString == "true";
    }
    static setHardmode = (hardmode) => {
        Cookies.set('hardmode', hardmode);
    }
    
    static getDarkmode = () => {
        const darkmodeString = Cookies.get('darkmode');
        return darkmodeString != "false";
    }
    static setDarkmode = (darkmode) => {
        Cookies.set('darkmode', darkmode);
    }

    static getLanguage = () => {
        const languageString = Cookies.get('language');
        if (languageString == "danish") {
            return Language.Danish;
        } else if (languageString == "english") {
            return Language.English;
        } 
        return Language.Danish;
    }
    static setLanguage = (language) => {
        if (language == Language.English) {
            Cookies.set('language', "english");
        } else if (language == Language.Danish) {
            Cookies.set('language', "danish");
        } 
        
    }
    static clear = () => {
        Cookies.remove('stats');
        Cookies.remove('hardmode');
        Cookies.remove('darkmode');
        Cookies.remove('tutorial');
        Cookies.remove('language');
    }
}

export { CookieHelper };