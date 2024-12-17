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
const restart = document.querySelector('.restart');
const closeGameRule = document.getElementById('close-game-rule');
const mainBackgroundWinner = document.getElementById('main');

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

    gameRuleContent.classList.add('fix-display-game-rule-content');
    layer.classList.remove('hidden');
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
    gameRuleBtn.classList.toggle('hidden');
    hideTools.classList.add('hidden');
    author.classList.add('hidden');
    showTools.classList.remove('hidden');
    restart.classList.add('hidden');
});
showTools.addEventListener('click' , function() {
    gameRuleBtn.classList.toggle('hidden');
    hideTools.classList.remove('hidden');
    showTools.classList.add('hidden');
    author.classList.remove('hidden');
    restart.classList.remove('hidden');
});