(function(){
    'use strict';
    console.log("reading js");

    // retrieve div id for each components of the game
    let startGame = document.getElementById('roll');

    var greeting = document.getElementById('greeting');
    var notes = document.getElementById('extraNotes');
    
    var diceImages = document.getElementById('dice_imgs');
    
    var score = document.getElementById('totalPoints');
    var actionArea = document.getElementById('actions');

    var quitGameButton = document.getElementById('quitgame');
    quitGameButton.addEventListener("click", function(){
        location.reload();
    });

    // sound effect audio
    const rollingSound = new Audio('media/aerosol+spray+shake.mp3');
    const passTurnSound = new Audio('media/Switch3.mp3');

    // store all relevant game data in array
    var gameData = {
        dice: ['die1.png', 'die2.png', 'die3.png', 
            'die4.png', 'die5.png', 'die6.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    // start the game by randomly pick 0 or 1
    startGame.addEventListener("click", function(){
        gameData.index = Math.round(Math.random());
        setUpTurn();
    });

    function setUpTurn(){
        greeting.innerHTML =`hello ${gameData.players[gameData.index]}, choose your action`;
        notes.innerHTML = "";
        diceImages.innerHTML = "";
        actionArea.innerHTML = '<button id="roll">Roll Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            rollingSound.play();
            console.log("roll the dice!");            
            throwDice();                
        });
    }

    function throwDice(){
        actionArea.innerHTML = '<button id="pass">Pass Turn</button> <button id="roll">Roll Dice</button>';

        /* actionArea.innerHTML = ''; */
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    
        diceImages.innerHTML = `<img src="images/${gameData.dice[gameData.roll1 - 1]}">
                        <img src="images/${gameData.dice[gameData.roll2 - 1]}"> `;
        
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // if the player rolls two Ones, we will switch the player, zero out the score, and setup turn
        if (gameData.rollSum === 2) {
            greeting.innerHTML += '<p>Oops.. You got snake eyes!</p>';
            actionArea.innerHTML = "";

            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            // show current score
            updateCurrentScore();
            setTimeout(setUpTurn, 2000);
        }
        // if the player rolls a One, we just switch the turn
        else if (gameData.roll1 === 1 || gameData.roll2 === 1 ){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);     

            notes.innerHTML += `<p>Opps. You rolled a one so it's ${gameData.players[gameData.index]}'s turn now</p>`;
            actionArea.innerHTML = "";

            setTimeout(setUpTurn, 2000);
        }
        // if neither die is a 1, count the current scores and continue
        else {
            // update Score
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            document.getElementById('roll').addEventListener('click', function(){
                rollingSound.play();
                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function(){
                passTurnSound.play();
                //clear the images section when switching to another player
                diceImages.innerHTML = "";
                //swap the current player when the turn is switched
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            checkWinningCondition();
        }
    }

    // this function displays the current scoring on the score board container
    function updateCurrentScore(){
        score.innerHTML = `<p>${gameData.players[0]}: ${gameData.score[0]} Points <br><br>
            ${gameData.players[1]}: ${gameData.score[1]} Points</p>`
    }

    // check scoreboard to see if a player is winning
    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = `<h2> ${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            actionArea.innerHTML = "";
            diceImages.innerHTML = "";
            greeting.innerHTML = "Thanks For Playing!";
            actionArea.innerHTML += `<button id="startover">Start a New Game!</button>`;
            // a button that reloads the page and start the game fresh again
            document.getElementById('startover').addEventListener("click", function(){
                location.reload();
            });
        } else{
            // if no winner, then update scoreboard
            updateCurrentScore();
        }
    }

}());