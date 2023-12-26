class CookieHelper {
    static parseStats = (statString) => {
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
        }
    }
    static parseTutorialString = (tutorialString) => {
        if (parseInt(tutorialString)) {
            return false;
        } else {
            return true;
        }
    }
}

export { CookieHelper };