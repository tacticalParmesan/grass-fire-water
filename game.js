// Global variables for handling game functionalityS
let playerScore  = 0;
let computerScore = 0;

// Grabbing references for pre-existing elements to acces
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");
const playerChoiceText = document.querySelector(".player-choice");
const computerChoiceText = document.querySelector(".computer-choice");
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
const roundResult = document.querySelector(".round-result");
const gameOverArea = document.querySelector(".gameover-area");


const playerChoiceButtons = document.querySelector(".rps-buttons");

// Storing player choice according to button clicked - using event delegation
function getPlayerChoice(clickEvent) {
  let playerChoice = "";
  let target = clickEvent.target;

  switch(target.id) {
    case "rock-button":
      playerChoice = "rock";
      console.log("Clicked Rock");
      break;
    case "paper-button":
      playerChoice = "paper";
      console.log("Clicked paper");
      break;
    case "scissors-button":
      playerChoice = "scissors"
      console.log("Clicked scissors");
      break;
  }
  return playerChoice;
};

// Getting computer choice using an RNG
function getComputerChoice() {
  let computerChoice = "";

  // The computer's choice is tied to a random number between 1 and 3;
  let randomNumber = Math.floor(Math.random() * 3) + 1; // +1 To avoid 0
  switch (randomNumber) {
    case 1:
      computerChoice = "rock";
      break;
    case 2:
      computerChoice = "paper";
      break;
    case 3:
      computerChoice = "scissors"
      break;
  }
  return computerChoice;
}

function getRoundWinner(playerHand, computerHand) {
  let winner = "";

  // Implementing the basic game logic
  if (playerHand === "rock" && computerHand === "scissors") {
    winner = "player";
  } else if (playerHand === "scissors" && computerHand === "paper") {
    winner = "player";
  } else if (playerHand === "paper" && computerHand === "rock") {
    winner = "player";
  } else if (computerHand === "rock" && playerHand === "scissors") {
    winner = "computer";
  } else if (computerHand === "scissors" && playerHand === "paper") {
    winner = "computer";
  } else if (computerHand === "paper" && playerHand === "rock") {
    winner = "computer";
  };

  // Account for ties and stop the game
  if (playerHand === computerHand) {
    winner = "tie";
  }
  return winner;
}

function playRound(playerChoice, computerChoice) {
  playerChoiceText.textContent = "Player chose: " + playerChoice;
  computerChoiceText.textContent = "Computer chose: " + computerChoice;

  let roundWinner = getRoundWinner(playerChoice, computerChoice);

  if (roundWinner === "player") {
    roundResult.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
    playerScore += 1;
  } else if (roundWinner === "computer") {
    roundResult.textContent = `You lose! ${playerChoice} beats ${computerChoice}.`;
    computerScore += 1;
  } else {
    roundResult.textContent = "It's a tie. Both chose " + playerChoice;
  }

  update();
}

function update() {

  playerScoreText.textContent = "Player score: " + playerScore;
  computerScoreText.textContent = "Computer score: " + computerScore; 
  checkMatchWinner();

}

function checkMatchWinner() {
  const gameOverText = document.createElement("div");
  const resetButton = document.createElement("button");

  // When the total score hits 5, it's game over.
  if (playerScore + computerScore === 5) {

    if (playerScore > computerScore) {
      gameOverText.textContent = "You win the match!";
    } else if (playerScore < computerScore) {
      gameOverText.textContent = "You lose! Computer wins the match!"
    }

    gameOverArea.appendChild(gameOverText);

    // Disable the buttons and stopping the event propagation
    const buttonsToDisable = document.querySelectorAll(".rps-button");
    buttonsToDisable.forEach( (btn) => {
      btn.disabled = true;
    } )
    playerChoiceButtons.removeEventListener("click", (ev) => playRound(getPlayerChoice(ev), getComputerChoice()));

  }
}


function playGame() {
  // Play a round everytime the user clicks an option
  playerChoiceButtons.addEventListener("click", (ev) => playRound(getPlayerChoice(ev), getComputerChoice()));
}

playGame();




