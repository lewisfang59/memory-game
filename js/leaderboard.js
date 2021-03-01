const getDataFromDB = () => {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();

        xhttp.open('GET', SERVER_URL, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(this.responseText);
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(this.statusText);
                }
            }
        };
    });
};

const populateBoard = async () => {
    let data;

    if (
        window.sessionStorage.getItem(SESSION_ID_PREV_URL) === URL_SUMMARY_PAGE
    ) {
        document.getElementById(
            LEADERBOARD_ID_CURRENT_USER_SCORE
        ).style.display = 'block';
        const currName = document.getElementById(LEADERBOARD_ID_CURRENT_NAME);
        const currScore = document.getElementById(LEADERBOARD_ID_CURRENT_SCORE);

        currName.innerHTML = window.sessionStorage.getItem(
            SESSION_ID_USER_NAME
        );
        currScore.innerHTML = window.sessionStorage.getItem(
            SESSION_ID_USER_SCORE
        );
    }

    await getDataFromDB()
        .then((value) => {
            data = value;
        })
        .catch((err) => console.log(err));

    const nameEle = document.getElementsByClassName(LEADERBOARD_ID_NAME);
    const scoreEle = document.getElementsByClassName(LEADERBOARD_ID_SCORE);

    for (let i = 0; i < data.length; i++) {
        let entry = data[i];

        let name = entry.username;
        let score = entry.score;

        nameEle[i].innerHTML = name;
        scoreEle[i].innerHTML = score;
    }
};

document.getElementById(LEADERBOARD_ID_MENU_BUTTON).onclick = (e) => {
    window.location.href = URL_INDEX_PAGE;
};

document.getElementById(LEADERBOARD_ID_RESTART_BUTTON).onclick = (e) => {
    window.location.href = URL_GAME_PAGE;
};

populateBoard();
