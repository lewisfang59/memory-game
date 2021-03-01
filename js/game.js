const cards = document.getElementsByClassName(GAME_CLASS_CARD);
const gameContainer = document.getElementById(GAME_ID_MEMORY_GAME);
const scoreEle = document.getElementById(GAME_ID_SCORE);

const cardNum = 25;
let selectedTiles;
let clickedTiles = [];
let clickedCount;
let score = 0;

const difficulty = {
    easy: 3,
    moderate: 4,
    hard: 5,
    hell: 6,
    impossible: 7,
};

difficulty.currentDifficulty = difficulty.easy;

const increaseDifficulty = () => {
    if (difficulty.currentDifficulty === difficulty.easy) {
        difficulty.currentDifficulty = difficulty.moderate;
    } else if (difficulty.currentDifficulty === difficulty.moderate) {
        difficulty.currentDifficulty = difficulty.hard;
    } else if (difficulty.currentDifficulty === difficulty.hard) {
        difficulty.currentDifficulty = difficulty.hell;
    } else if (difficulty.currentDifficulty === difficulty.hell) {
        difficulty.currentDifficulty = difficulty.impossible;
    }
};

const decreaseDifficulty = () => {
    if (difficulty.currentDifficulty === difficulty.moderate) {
        difficulty.currentDifficulty = difficulty.easy;
    } else if (difficulty.currentDifficulty === difficulty.hard) {
        difficulty.currentDifficulty = difficulty.moderate;
    } else if (difficulty.currentDifficulty === difficulty.hell) {
        difficulty.currentDifficulty = difficulty.hard;
    } else if (difficulty.currentDifficulty === difficulty.impossible) {
        difficulty.currentDifficulty = difficulty.hell;
    }
};

function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);

    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

const flipSound = new sound(GAME_SOUND_CARD_FLIP);
const winSound = new sound(GAME_SOUND_CORRECT);
const loseSound = new sound(GAME_SOUND_INVALID);

const pause = (sec) => {
    return new Promise((resolve) => {
        let ms = sec * 1000;
        setTimeout(resolve, ms);
    });
};

const getRandomTile = () => {
    let arrayOfRand = [];

    while (arrayOfRand.length < difficulty.currentDifficulty) {
        let rand = Math.floor(Math.random() * (cardNum - 0));

        while (arrayOfRand.includes(rand)) {
            rand = Math.floor(Math.random() * (cardNum - 0));
        }

        arrayOfRand.push(rand);
    }

    return arrayOfRand;
};

const addOnClick = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = cardClicked;
    }
};

const removeOnClick = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = null;
    }
};

const boardAnimation = () => {
    return new Promise((resolve) => {
        for (let n of selectedTiles) {
            cards[n].classList.add(GAME_CLASS_FLIP);
            flipSound.play();
        }

        pause(2).then(() => {
            for (let n of selectedTiles) {
                cards[n].classList.remove(GAME_CLASS_FLIP);
                flipSound.play();
            }

            // Wait for card flip animation
            pause(1).then(() => {
                gameContainer.classList.add(GAME_CLASS_ROTATE);
                resolve();
            });
        });
    });
};

const resetGame = () => {
    return new Promise((resolve) => {
        clickedTiles = [];

        // reset tiles
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains(GAME_CLASS_USER_FLIP)) {
                cards[i].classList.remove(GAME_CLASS_USER_FLIP);
                flipSound.play();
            }
        }

        pause(1).then(() => {
            gameContainer.classList.remove(GAME_CLASS_ROTATE);
            resolve();
        });
    });
};

const restartGame = () => {
    removeOnClick();

    // Wait 1 second so it does not happen too quick
    pause(1).then(async () => {
        await resetGame();

        pause(1).then(() => {
            startNewRound();
        });
    });
};

const terminate = () => {
    window.sessionStorage.setItem(SESSION_ID_USER_SCORE, score);
    // window.location.href = '/comp4537/memoryGame/summary.html';
    window.location.href = URL_SUMMARY_PAGE;
};

/**
 * Show Correct Tiles if user clickedCount wrong button
 */
const showCorrectTile = () => {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        let isCorrect = card.getAttribute(GAME_ATTRIBUTE_IS_CORRECT) === 'true';

        if (isCorrect) {
            if (!clickedTiles.includes(card)) {
                card.classList.add(GAME_CLASS_USER_FLIP);
                flipSound.play();
            }
        }
    }
};

function cardClicked() {
    this.classList.add(GAME_CLASS_USER_FLIP);
    flipSound.play();

    let isCorrect = this.getAttribute(GAME_ATTRIBUTE_IS_CORRECT) === 'true';

    if (!isCorrect) {
        score -= 100;
        scoreEle.innerHTML = score;

        if (score <= 0) {
            terminate();
        }

        loseSound.play();
        showCorrectTile();
        decreaseDifficulty();
        restartGame();
    } else {
        if (!clickedTiles.includes(this)) {
            clickedTiles.push(this);
            clickedCount++;
            score += 100;
            scoreEle.innerHTML = score;
        }

        if (clickedCount == difficulty.currentDifficulty) {
            winSound.play();
            increaseDifficulty();
            restartGame();
        }
    }
}

/**
 * Ramdomly select {difficulty.currentDifficulty} of tiles
 * Assign correct back image for correct/incorrect tiles
 * And add necessary attributes.
 */
const gameInit = () => {
    selectedTiles = getRandomTile();
    clickedCount = 0;

    for (let i = 0; i < cards.length; i++) {
        let isCorrect = false;

        let card = cards[i];
        let backFaceCard = card.querySelector(GAME_CLASS_BACK_FACE);

        if (selectedTiles.includes(i)) {
            isCorrect = true;
            backFaceCard.style.backgroundImage = GAME_IMAGE_URL_CORRECT;
            backFaceCard.style.backgroundSize = 'cover';
        } else {
            backFaceCard.style.backgroundImage = GAME_IMAGE_URL_INCORRECT;
            backFaceCard.style.backgroundSize = 'cover';
        }

        card.setAttribute(GAME_ATTRIBUTE_IS_CORRECT, isCorrect);
    }
};

const startNewRound = async () => {
    gameInit();

    await boardAnimation();

    // Wait for the rotate animation to be done.
    await pause(2).then(() => {
        addOnClick();
    });

    return;
};

startNewRound();
