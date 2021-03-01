const populateScore = () => {
    let userScore = window.sessionStorage.getItem(SESSION_ID_USER_SCORE);
    document.getElementById(SUMMARY_ID_SCORE).innerHTML = userScore;
};

populateScore();

const sendPostRequest = () => {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();

        let name = document.getElementById(SUMMARY_ID_NAME_INPUT).value;
        const userScore = window.sessionStorage.getItem(SESSION_ID_USER_SCORE);

        if (name === '') {
            name = SUMMARY_ANONYMOUS;
        }

        xhttp.open(
            'POST',
            SERVER_URL +
                '?' +
                SERVER_URL_PARAM_NAME +
                '=' +
                name +
                '&' +
                SERVER_URL_PARAM_SCORE +
                '=' +
                userScore,
            true
        );
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                resolve(name);
            }
        };
    });
};

document.getElementById(SUMMARY_ID_SUBMIT_BUTTON).onclick = (e) => {
    document.getElementById(SUMMARY_ID_CONTAINER_DIV).style.display = 'none';
    document.getElementById(SUMMARY_ID_LOADER).style.display = 'inline';

    sendPostRequest().then((value) => {
        window.sessionStorage.setItem(SESSION_ID_USER_NAME, value);
        window.sessionStorage.setItem(SESSION_ID_PREV_URL, URL_SUMMARY_PAGE);
        window.location.href = URL_LEADERBOARD_PAGE;
    });
};

document.getElementById(SUMMARY_ID_RESTART_BUTTON).onclick = (e) => {
    window.location.href = URL_GAME_PAGE;
};
