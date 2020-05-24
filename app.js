/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying=true;

init();

//*******************ROLL THE DICE BUTTON*******************************
document.querySelector('.btn-roll').addEventListener('click' , function(){
    if(gamePlaying){
        //1. Generate a random number
    dice = Math.floor(Math.random()*6) + 1;

    //2. Display the result
    //.dice is class of img tag
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the score IF not 1
    if (dice !== 1){
        //add score
        roundScore = roundScore + dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else {
        nextPlayer();
    }
    }
});
//******************************************************************

// ***************************HOLD BUTTON FUNCTIONALITY********************************************

document.querySelector('.btn-hold').addEventListener('click' , function(){
    if(gamePlaying){
        //1.Add current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //2. update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 

    //Check if won the game
    if (scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner ! ';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying=false; 
    }
    else {
        //3.Change player
        nextPlayer();
    }
    }
    
});

//***********************************************************

//*********** NEW GAME BUTTON ********************

document.querySelector('.btn-new').addEventListener('click' , init);

// ********************************************
function nextPlayer(){
    //Change the active player (toggle)
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    //Set round score to 0
    roundScore = 0;

    //Display both the scores as 0
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    //Change player appearence from active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide the dice
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    // Set all the variables to Zero initially
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;

    //Hide dice Initially
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');    
}


