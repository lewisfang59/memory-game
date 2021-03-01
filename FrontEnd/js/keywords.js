// -------------------------- Index Scene ------------------------- //
const INDEX_ID_START_BUTTON = 'startButton';
const INDEX_ID_LEADERBOARD_BUTTON = 'leaderBoardButton';

// -------------------------- Game Scene -------------------------- //
const GAME_CLASS_CARD = 'card';
const GAME_CLASS_FLIP = 'flip';
const GAME_CLASS_ROTATE = 'rotate';
const GAME_CLASS_USER_FLIP = 'userFlip';
const GAME_CLASS_BACK_FACE = '.back-face';

const GAME_ID_MEMORY_GAME = 'memory-game';
const GAME_ID_SCORE = 'score';

const GAME_ATTRIBUTE_IS_CORRECT = 'isCorrect';

const GAME_IMAGE_URL_CORRECT = "url('./resource/img/correct3.png')";
const GAME_IMAGE_URL_INCORRECT = "url('./resource/img/incorrect.png')";
const GAME_SOUND_CARD_FLIP = './resource/sounds/cardflip.mp3';
const GAME_SOUND_CORRECT = './resource/sounds/correct.mp3';
const GAME_SOUND_INVALID = './resource/sounds/invalid.mp3';

// ----------------------- Leaderboard Scene ----------------------- //
const LEADERBOARD_ID_CURRENT_USER_SCORE = 'currUserScore';
const LEADERBOARD_ID_CURRENT_NAME = 'currentName';
const LEADERBOARD_ID_CURRENT_SCORE = 'currentScore';
const LEADERBOARD_ID_NAME = 'name';
const LEADERBOARD_ID_SCORE = 'score';
const LEADERBOARD_ID_MENU_BUTTON = 'menuButton';
const LEADERBOARD_ID_RESTART_BUTTON = 'restartButton';

// ------------------------- Summary Scene ------------------------- //
const SUMMARY_ID_SCORE = 'score';
const SUMMARY_ID_NAME_INPUT = 'nameInput';
const SUMMARY_ID_SUBMIT_BUTTON = 'submitButton';
const SUMMARY_ID_RESTART_BUTTON = 'restartButton';
const SUMMARY_ID_CONTAINER_DIV = 'container';
const SUMMARY_ID_LOADER = 'loader';

const SUMMARY_ANONYMOUS = 'Anonymous';

// ----------------------------- URL's ----------------------------- //
const URL_SUMMARY_PAGE = '/comp4537/memoryGame/summary.html';
const URL_INDEX_PAGE = '/comp4537/memoryGame/index.html';
const URL_GAME_PAGE = '/comp4537/memoryGame/game.html';
const URL_LEADERBOARD_PAGE = '/comp4537/memoryGame/leaderboard.html';

// const URL_SUMMARY_PAGE =
//     'http://127.0.0.1:5500/public/comp4537/memoryGame/summary.html';
// const URL_INDEX_PAGE =
//     'http://127.0.0.1:5500/public/comp4537/memoryGame/index.html';
// const URL_GAME_PAGE =
//     'http://127.0.0.1:5500/public/comp4537/memoryGame/game.html';
// const URL_LEADERBOARD_PAGE =
//     'http://127.0.0.1:5500/public/comp4537/memoryGame/leaderboard.html';

// ---------------------------- Server ---------------------------- //
const SERVER_URL = 'https://memory-game-4537.herokuapp.com/';
const SERVER_URL_PARAM_NAME = 'name';
const SERVER_URL_PARAM_SCORE = 'score';

// ---------------------------- Session --------------------------- //
const SESSION_ID_USER_NAME = 'username';
const SESSION_ID_USER_SCORE = 'userScore';
const SESSION_ID_PREV_URL = 'prevURL';
