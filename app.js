/*
It's no longer x and o's
Cats vs dogs?
Bombs and ???
ghost vs 
<i class="fas fa-bomb"></i>
<i class="fas fa-ghost"></i>
<i class="fas fa-spider"></i>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
add a way to change each players icon?

> start game 
> player one goes
> selects a "gamebox"
> "gamebox" now has an x or an o (in this case ghost or blah.)
> check to see if that's a win or draw
> change players.
> repeat until game is over
####################################################################
  > fix the IDs in the HTML, use data in the HTML instead. data-BLAH. You can name it whatever you want.
  > change your winning condition to a smaller loop using nested arrays to contain the win conditions
  > add the easy and attempt the difficult bot
####################################################################
Bot:
easy: Have the bot place anywhere one cube after you
medium: Have the bot place randomly
hard: have the bot try to win based on the possible win conditions. Bassically have it check through the possible win conditions, and if it's possible, place at a cube in that possible arrangment.

have a bot button at the start of the rounds; need to ask what type of game now..
*/


const gameBody = document.getElementById("game-body");
const gameBoxes = document.querySelectorAll(".gamebox");

const winImage = document.getElementById("win-image");
const winnerPane = document.getElementById("winner-pane");

const buttons = document.getElementsByTagName("button");

const newGameButton = document.getElementById("btn-new");
const musicButton = document.getElementById("btn-msc");

const botGame = document.getElementById("btn-bot");
const multiPlayerGame = document.getElementById("btn-plyr");
const gameStartPlyrCheck = document.getElementById("player-check");

const numOfHomers = 6;

let doh = new Audio("doh.mp3");
// let evilLaugh = new Audio("");
let evilLaugh = new Audio("evil-laugh2.wav");
let newGameAudio = new Audio("prepare_to_die.mp3");
let musicAudio = new Audio("spooky-scary.mp3");



game = {
  player0: 0,
  player1: 1,
  player0Num: 1,  //  Used in the array
  player1Num: 2,  //  Used in the array
  currentPlayer: 0,
  player0Icon: `<i style="color: white" class="fas fa-ghost"></i>`,
  player1Icon: `<i class="fas fa-spider"></i>`,
  playingBotGame: false,
  // Have to use 1 and 2 for the players x and o, because 0 is the default. Could use 0 and 1, and undefined for the 0s, just make sure to change your check condition
  gameArray: 
   [0,0,0,
    0,0,0,
    0,0,0],
  roundCounter: 0,

}

multiPlayerGame.addEventListener("click", function(e){
  game.playingBotGame = false;
  //hide the player-checker
  gameStartPlyrCheck.style.display = "none";
  //have the tiles reappear
  gameBoxes.forEach(element => {
    element.style.display = "flex";
    element.innerHTML = "";
  });
  //reg 2 player game starts;
  gameBody.addEventListener("click", twoPlayerGame);
});

// Yeah so, don't use anonymous event listeners.
function twoPlayerGame(e){
  // = current players icon(which doesn't matter because we're going to be comparing ones and zeros)
  if(e.target.classList[0] === "gamebox"){
    if(e.target.innerHTML === ""){
      // add the icon
      e.target.innerHTML = game[`player${game.currentPlayer}Icon`];
      anime({
        targets: e.target.children,
        rotate: '1turn',
        duration: 2000,
        loop: false,
      });
      game.gameArray[e.target.id] = game[`player${game.currentPlayer}Num`];
      // Check if the player has won or draw
      if(isDraw()) {
        draw();
      } else if (isWin()) {
        // The current player has won, end the game.

        gameOver();
      } else {
        // Change the player.. I.E. end turn
        endTurn();
      }
    }
  }
};

botGame.addEventListener("click", function(e){
  game.currentPlayer = 0; // FIX
  // let the game know this is a bot game.
  game.playingBotGame = true;
  //hide the player-checker
  gameStartPlyrCheck.style.display = "none";
  //have the tiles reappear
  gameBoxes.forEach(element => {
    element.style.display = "flex";
    element.innerHTML = "";
  });
  gameBody.removeEventListener("click", twoPlayerGame); // FIX
  //player 1 goes first; then bot,
  gameBody.addEventListener("click", botAndPlayerEvent);
});


newGameButton.addEventListener("click", function(){
  /*New game needs with 2 players and bots*/
  game.playingBotGame = false;
  // remove bot game event listener
  gameBody.removeEventListener("click", botAndPlayerEvent);
  /*have the player-check pop up, hide the images, hide the tiles,*/
  gameStartPlyrCheck.style.display = "flex";
  /*then once bot or 2 players were chosen, show the tiles, hide player-check*/

  // reappear the game squares and reset thier values
  gameBoxes.forEach(element => {
    element.style.display = "none";
    element.innerHTML = "";
  });
  // hide the picture
  winImage.style.display = "none";
  // update the info pane by reseting the winner
  winnerPane.innerText = ``;
  game.gameArray = [0,0,0,0,0,0,0,0,0];
  newGameAudio.play();
});

musicButton.addEventListener("click", function(){
  musicAudio.volume = 0.5;
  if(!musicAudio.paused){
    musicAudio.pause();
  } else {
    musicAudio.play();
  }
});

function endTurn() {
  if(game.currentPlayer === 0){
    game.currentPlayer = 1;
  } else {
    game.currentPlayer = 0;
  }
};

function isWin(){
  /*
    Possible winning conditions:
    xxx --- --- 0 1 2
    --- xxx --- 3 4 5
    --- --- xxx 6 7 8

    x-- -x- --x
    x-- -x- --x
    x-- -x- --x

    x-- --x
    -x- -x-
    --x x--
  */
  let num = game[`player${game.currentPlayer}Num`];
  if(game.gameArray[0] === num && game.gameArray[1] === num && game.gameArray[2] === num){
    return true;
  } else if (game.gameArray[3] === num && game.gameArray[4] === num && game.gameArray[5] === num) {
    return true;
  } else if (game.gameArray[6] === num && game.gameArray[7] === num && game.gameArray[8] === num) {
    return true;
  } else if (game.gameArray[0] === num && game.gameArray[3] === num && game.gameArray[6] === num) {
    return true;
  } else if (game.gameArray[1] === num && game.gameArray[4] === num && game.gameArray[7] === num) {
    return true;
  } else if (game.gameArray[2] === num && game.gameArray[5] === num && game.gameArray[8] === num) {
    return true;
  } else if (game.gameArray[0] === num && game.gameArray[4] === num && game.gameArray[8] === num) {
    return true;
  } else if (game.gameArray[2] === num && game.gameArray[4] === num && game.gameArray[6] === num) {
    return true;
  } else {
    return false;
  }
}

function isDraw(){
  let store = true;
  game.gameArray.forEach(element => {
    // check if the array still has any zeros left. If it doesn't, it's a draw
    if(element === 0){
      store = false;
    }
  });
  console.log(store);
  return store;
}

function draw(){
  game.roundCounter++;
  odometer.innerHTML = game.roundCounter;
  //  sound
  doh.play();
  // hide the game squares .gameBoxes
  gameBoxes.forEach(element => {
    element.style.display = "none";
  });
  // show the picture #winImage
  winImage.style.display = "block";
  winImage.src = randomHomerGif();
   
  // update the info pane
  winnerPane.innerText = `Draw!`;
  console.log("Draw!");
}

function gameOver() {
  game.roundCounter++;
  odometer.innerHTML = game.roundCounter;
  // sound
  evilLaugh.play();
  // hide the game squares .gameBoxes
  gameBoxes.forEach(element => {
    element.style.display = "none";
  });
  // show the picture #winImage
  winImage.src = "fbd3bbfc555fb8d919034c78c9849c43.gif";
  winImage.style.display = "block";
  // update the info pane

  // Check if the game is a regular game, or a bot game.
  if(game.playingBotGame){
    // Bot game
    if(game.currentPlayer === 0){
      winnerPane.innerText = `The player wins!`;
    } else {
      winnerPane.innerText = `The bot has defeated you!`
    }
    // remove bot game event listener
    gameBody.removeEventListener("click", botAndPlayerEvent);
  } else {
    // Non bot game.
    winnerPane.innerText = `player ${game.currentPlayer + 1} wins!`;
  }

  // Reset bot game condition
  game.playingBotGame = false;
  console.log("Game Over!");
}

function randomHomerGif(){
  let num = Math.floor((Math.random() * numOfHomers)+1);
  return `homer${num}.gif`;
}


//============BOT STUFFs============
function botAndPlayerEvent (e){
  // player plays
  if(game.currentPlayer === 0){
  // = current players icon(which doesn't matter because we're going to be comparing ones and zeros)
    if(e.target.classList[0] === "gamebox"){
      // ############change this from .innerHTML === "" to something more specific###########
      if(e.target.innerHTML === ""){
        // add the icon
        e.target.innerHTML = game[`player${game.currentPlayer}Icon`];
        game.gameArray[e.target.id] = game[`player${game.currentPlayer}Num`];
        // Check if the player has won or draw
        if(isDraw()) {
          draw();
        } else if (isWin()) {
          // The current player has won, end the game.
          // for the case of the bot game, I need to check before hand who wins to properly set the winning text, as this game was designed for two players..
          gameOver();
        
        } else {
          // Change the player.. I.E. end turn
          endTurn();
          // bot plays here because I want it to happen immedietly after the player plays..
          botPlayMedium();
          // botPlayHard();
        }
      }
    }
  } 
}


function randomGameArrayNum(lengthOfArray){
  // Returns a random index for the input arrays length, does not add 1, because we may need 0.
  return Math.floor(Math.random() * lengthOfArray);
}

function getHighestNumIndex(array){
  // this should actually return the index of the highest num...
  let store;
  let previousElement = 0;

  for(const index in array){
    if(array[index] > previousElement){
      store = index;
      previousElement = array[index];
    } 
  }
  return parseInt(store);
}

function botPlayMedium(){
  // Check to see what has been played and what places are open
  // 
  // make an array out of the game array with the index values of OPEN spaces. compare with 0.
  // use a for in to get the index if the value = 0 then store that index value in an array.
  let potenPlacementArray = [];
  for(const block in game.gameArray){
    if(game.gameArray[block] === 0){
      potenPlacementArray.push(block);
    }
  }
  console.log(potenPlacementArray);
  //update the array to a single num
  potenPlacementArray = potenPlacementArray[randomGameArrayNum(potenPlacementArray.length)];
  //array is updated
  game.gameArray[potenPlacementArray] = game[`player${game.currentPlayer}Num`];
  //html is updated
  document.getElementById(potenPlacementArray).innerHTML = game[`player${game.currentPlayer}Icon`];

  // Select a random index to play a num then 
  // do the usual checks is draw, isWon, endturn etc;
  if(isDraw()) {
    draw();
  } else if (isWin()) {
    // The current player has won, end the game.
    gameOver();
  } else {
    // Change the player.. I.E. end turn
    endTurn();
  }
}


// #######################################
// Title breath animation
function createTest() {
  let colorEl = document.getElementsByTagName('header');
  anime({
    targets: colorEl,
    scale: [.97, .75],
    direction: 'alternate',
    easing: 'easeInOutSine',
    duration: 4000,
    loop: true
  });
}

createTest();
// Button hover breath animation
document.addEventListener("mouseover", function(e){
  if(e.target.tagName === "BUTTON"){
    console.log(e.target);
    anime({
      targets: e.target,
      scale: [.97, .75],
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 250,
      loop: 1,
    });
  }
});
/* ############################# */
/*
our stuff
documentation
implementation

*/


/**
 * Anime good support yet moderate to implement.
 * Odometer has okay support yet easy implement.
 * 
 * How to implement Anime: You call it as a function, using an object as an argument.
 * The object contains the properties you wish to use. Such as loops, durations, type of loop and many more.
 * 
 * How to implement Odometer: Literally just use an HTML odometer element, changing the innerHTML/ innerText as you need.
 * 
 * Then show our usages of both on the Tic Tac Toe game.
 * 
 * Other possibilities: *show them*
 */
