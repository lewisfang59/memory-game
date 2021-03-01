document.getElementById(INDEX_ID_START_BUTTON).onclick = (e) => {
    window.location.href = URL_GAME_PAGE;
};

document.getElementById(INDEX_ID_LEADERBOARD_BUTTON).onclick = (e) => {
    window.sessionStorage.setItem(SESSION_ID_PREV_URL, URL_INDEX_PAGE);
    window.location.href = URL_LEADERBOARD_PAGE;
};
