"use strick"


// selecting elements
const hrs = document.getElementById('hrs');
const min = document.getElementById('min');
const sec = document.getElementById('sec');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const newGameBtn = document.getElementById('new-game-btn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const holdBtn = document.getElementById('hold-btn');

const diceImage = document.querySelector('.dice-image');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const playerMainScore0El = document.querySelector('.player-main-score--0');
const playerMainScore1El = document.querySelector('.player-main-score--1');

// game rule selecting elements
const gameRuleBtn = document.querySelector('.game-rule-btn');
const gameRuleContent = document.querySelector('.game-rule-content');
const layer = document.querySelector('.layer');
const hideTools = document.querySelector('.hide-tools');
const showTools = document.querySelector('.show-tools');
const author = document.querySelector('.author');
const authorContentContainer = document.querySelector('.author-content-container');
const layer2 = document.querySelector('.layer2');
const restart = document.querySelector('.restart');
const closeAuthorPage = document.getElementById('close-author-page');
const closeGameRule = document.getElementById('close-game-rule');
const mainBackgroundWinner = document.getElementById('main');

const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const gameSound = document.getElementById('game-sound');
const gameSound2 = document.getElementById('game-sound2');
const gameSound3= document.getElementById('game-sound3');

const loaderCounter = document.querySelector('.loader-counter');
const loader = document.querySelector('.loader');

const subscribeBtn = document.getElementById('subscribe-btn');
const inputArea = document.querySelector('.input-area');
const subcribeSuccess = document.querySelector('.subcribe-success');
const subscribeContainer = document.querySelector('.subscribe-container');
const layer3 = document.querySelector('.layer3');
const loaderSubscribeBtn = document.querySelector('.loader-subscribe-btn');
const subscribeLogo = document.querySelector('.subscribe-logo');
const subscribeContent = document.querySelector('.subscribe-content');
const closeSubscribe = document.querySelector('.close-subscribe');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const phoneNumber = document.getElementById('phone-number');
const subscribeMessage = document.getElementById('subscribe-message');
const email = document.getElementById('email');


showTools.classList.add('hidden');

// time functionality
setInterval(function(){
    const currentDate = new Date();
    
    hrs.textContent = (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours();
    min.textContent = (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
    sec.textContent = (currentDate.getSeconds() < 10 ? "0" : "") + currentDate.getSeconds();
});


const switchPlayer = function () {
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('active-player');
    player1El.classList.toggle('active-player');
}



// reseting elements
let currentScore , activePlayer , gameState , playerScores;
const init = function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    playerMainScore0El.textContent = 0;
    playerMainScore1El.textContent = 0;
    diceImage.classList.add('hidden');

    playerScores = [0 , 0];
    currentScore = 0;
    activePlayer = 0;
    gameState = true;

    layer.classList.add('hidden');

    player0El.classList.remove('active-player');
    player1El.classList.add('active-player');
    player0El.classList.remove('winner');
    player1El.classList.remove('winner');

    mainBackgroundWinner.classList.remove('main-winner-background');
}
init();


pauseBtn.classList.add('hidden');
loaderCounter.textContent = 1;
subcribeSuccess.classList.add('hidden');
loaderSubscribeBtn.classList.add('hidden');
closeSubscribe.classList.add('hidden');



// roll dice functionality
rollDiceBtn.addEventListener('click' , function () {
   if (gameState) {
        // remove new game btn
        newGameBtn.classList.add('opacity-hide');

        // generate a random value
        const diceValue = Math.trunc(Math.random() * 6) + 1;

        // generate random dice image
        diceImage.classList.remove('hidden');
        diceImage.src = `dice-${diceValue}.png`;

        currentScore += diceValue;

        // check for a 1 
        if (diceValue !== 1) {
            // add current score to current player
            document.getElementById(`score--${activePlayer}`).textContent = currentScore;
        }
        else {
            // switch player
            switchPlayer();
        }
   }
});


// hold btn functionality
holdBtn.addEventListener('click' , function () {
    if (gameState) {
        // add current score to current player
        playerScores[activePlayer] += currentScore;
        document.querySelector(`.player-main-score--${activePlayer}`).textContent = playerScores[activePlayer];

        // check if is equal to 57 : if yes end game
        if (playerScores[activePlayer] === 57) {
            // current player wins
            document.querySelector(`.player--${activePlayer}`).classList.add('winner');
            player0El.classList.remove('active-player');
            player1El.classList.remove('active-player');

            diceImage.classList.add('hidden');
            newGameBtn.classList.remove('opacity-hide');

            mainBackgroundWinner.classList.add('main-winner-background');

            gameState = false;
        }

        else if (playerScores[activePlayer] < 57) {
            playerScores[activePlayer] += currentScore - currentScore;
            document.querySelector(`.player-main-score--${activePlayer}`).textContent = playerScores[activePlayer];
            switchPlayer();
        }

        else {
            playerScores[activePlayer] = 0;
            document.querySelector(`.player-main-score--${activePlayer}`).textContent = 0;
            switchPlayer();
        }
    }

});

// hold functionality
newGameBtn.addEventListener('click' , init);

// restart functionality
restart.addEventListener('click' , init);



// game rule functionality
gameRuleBtn.addEventListener('click' , function () {
    gameRuleBtn.classList.add('hidden');
    author.classList.remove('hidden');

    gameRuleContent.classList.add('fix-display-game-rule-content');
    layer.classList.remove('hidden');
    authorContentContainer.classList.remove('author-js-add');
});

// close game rule functionality
closeGameRule.addEventListener('click' , function () {
    gameRuleContent.classList.remove('fix-display-game-rule-content');
    gameRuleBtn.classList.remove('hidden');
    layer.classList.add('hidden');

});

layer.addEventListener('click' , function () {
    gameRuleContent.classList.remove('fix-display-game-rule-content');
    layer.classList.add('hidden');
    gameRuleBtn.classList.remove('hidden');
});


hideTools.addEventListener('click' , function() {
    gameRuleBtn.classList.add('hidden');
    hideTools.classList.add('hidden');
    author.classList.add('hidden');
    showTools.classList.remove('hidden');
    restart.classList.add('hidden');
    
    layer2.classList.add('hidden');
    authorContentContainer.classList.remove('author-js-add');

    gameRuleContent.classList.remove('fix-display-game-rule-content');
    layer.classList.add('hidden');
});
showTools.addEventListener('click' , function() {
    gameRuleBtn.classList.toggle('hidden');
    hideTools.classList.remove('hidden');
    showTools.classList.add('hidden');
    author.classList.remove('hidden');
    restart.classList.remove('hidden');
});


layer2.classList.add('hidden');
author.addEventListener('click' , function() {
    authorContentContainer.classList.add('author-js-add');
    layer2.classList.remove('hidden');
    author.classList.add('hidden');
    gameRuleBtn.classList.remove('hidden');
    gameRuleContent.classList.remove('fix-display-game-rule-content');
    gameSound2.play();
    gameSound.pause();
    gameSound3.pause();
});
layer2.addEventListener('click' , function() {
    authorContentContainer.classList.remove('author-js-add');
    layer2.classList.add('hidden');
    author.classList.remove('hidden');
    gameSound2.pause();
    gameSound.play();
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
});
closeAuthorPage.addEventListener('click' , function() {
    authorContentContainer.classList.remove('author-js-add');
    layer2.classList.add('hidden');
    author.classList.remove('hidden');
    gameSound2.pause();
    gameSound.play();
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
});


// functionality of game sound
playBtn.addEventListener('click' , () => {
    playBtn.classList.toggle('hidden');
    pauseBtn.classList.toggle('hidden');
    gameSound.play();
    gameSound2.pause();
    gameSound3.pause();
});

pauseBtn.addEventListener('click' , () => {
    playBtn.classList.toggle('hidden');
    pauseBtn.classList.toggle('hidden');
    gameSound.pause();
    gameSound2.pause();
    gameSound3.pause();
});

window.addEventListener('keydown' , (e) => {
    if (e.keyCode === 49) {
        gameSound.play();
        gameSound2.pause();
        gameSound3.pause();
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }
});

window.addEventListener('keydown' , (e) => {
    if (e.keyCode === 50) {
        gameSound2.play();
        gameSound.pause();
        gameSound3.pause();
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }
});

window.addEventListener('keydown' , (e) => {
    if (e.keyCode === 51) {
        gameSound3.play();
        gameSound2.pause();
        gameSound.pause();
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }
});

window.addEventListener('keydown' , (e) => {
    if (e.keyCode === 83) {
        gameSound3.pause();
        gameSound2.pause();
        gameSound.pause();
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    }
});

window.addEventListener('keydown' , (e) => {
    if (e.keyCode === 32) {
        gameSound3.pause();
        gameSound2.pause();
        gameSound.play();
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }
});

// let i;
// setInterval(function() {
//     for (i = 1; i < 100; i++) {
//         loaderCounter.textContent = `${i}%`;
//     }
// } , 1000);

function count(start , stop) {
    setInterval(() => {
        loaderCounter.textContent = `${start}%`;
        if(start >= stop) {
            clearTimeout();
        } else {
            start++;
        }
    } , 200);
};

count(1 , 99);


// loader functionality
// time to use is 25000
setInterval(() => {
    loader.classList.add('loader-hide');
} , 25000);



// functionality of subscribe btn
subscribeBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    if(email.value) {
        email.classList.add('input-border-contain'); 
    }
    // first name if
    if(firstName.value.length >= 6) {  
        // last name if
        // firstName.style = 'border: 1px solid rgb(24, 199, 24)';
        firstName.classList.remove('input-border');
        firstName.classList.add('input-border-contain');
        if(lastName.value.length >= 6) {
            // phone number if
            lastName.classList.remove('input-border');
            lastName.classList.add('input-border-contain');
            if(phoneNumber.value) {
                // subscribe message if
                phoneNumber.classList.remove('input-border');
                phoneNumber.classList.add('input-border-contain');
                if(subscribeMessage.value.length >= 20) {
                    subscribeMessage.classList.remove('input-border');
                    subscribeMessage.classList.add('input-border-contain');
                    
                    // everything in the if statement are true
                    loaderSubscribeBtn.classList.remove('hidden');
                    setInterval(function() {
                        loaderSubscribeBtn.classList.add('hidden'); 
                        inputArea.classList.add('hide-subscribe-info');
                        subcribeSuccess.classList.remove('hidden');
                    
                        // Auto close (This have a problem)
                        // setInterval(() => {
                        //     subscribeContainer.classList.add('hidden');
                        //     layer3.classList.add('hidden');
                        // } , 4000);
                        
                        setInterval(() => {
                            closeSubscribe.classList.remove('hidden');
                        } , 3000);
                    } , 3000);

                } 
                // subscribe message else
                else {
                    subscribeMessage.classList.add('input-border');
                }
            }
            // phone number else
            else {
                phoneNumber.classList.add('input-border');
            }
        } 
        // last name else
        else {
            lastName.classList.add('input-border');
        }
    }
    // first name else
    else {
        firstName.classList.add('input-border');
    }
    
});


subscribeLogo.addEventListener('click' , () => {
    layer3.classList.add('bring-subscribe-content');
    subscribeContent.classList.add('bring-subscribe-content');
    gameRuleContent.classList.remove('fix-display-game-rule-content');
    layer.classList.add('hidden');
    gameRuleBtn.classList.remove('hidden');
});

closeSubscribe.addEventListener('click' , function() {
    layer3.classList.remove('bring-subscribe-content');
    subscribeContent.classList.remove('bring-subscribe-content');
});

window.addEventListener('keydown' , function(e) {
    if(e.keyCode === 79) {
        layer3.classList.add('bring-subscribe-content');
        subscribeContent.classList.add('bring-subscribe-content');
    }
});