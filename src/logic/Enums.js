const GameState = {
	Won: 0,
	Lost: 1,
	Running: 2
}
const CharState = {
    Correct: 0,
    SemiCorrect: 1,
    Wrong: 2,
    NotEvaluated: 3
}
const ErrorType = {
    None: 0,
    NotWord: 1,
    Length: 2,
    CorrectNotSet: 3,
    WrongSet: 4,
    SemiCorrectSet: 5,
    SemiCorrectNotSet: 6,
};
const Notification = {
    HardmodeEnableError: 7,
    HardmodeEnabled: 8,
    HardmodeDisabled: 9,
    CookiesReset: 10,
    LanguageEnable: 11,
}
const Language = {
    English: 0,
    Danish: 1,
}
export { ErrorType, GameState, CharState, Language, Notification }