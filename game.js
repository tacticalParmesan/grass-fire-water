// Global variables for handling game functionalities as score and DOM elements
let playerScore  = 0;
let computerScore = 0;
let isGameOver = false;

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

// All the buttons are accessed with event delegation
const playerChoiceButtons = document.querySelector(".rps-buttons");

// Storing player choice according to button clicked - using event delegation
function getPlayerChoice(clickEvent) {
  let playerChoice = "";
  let target = clickEvent.target;

  switch(target.id) {
    case "rock-button":
      playerChoice = "rock";
      break;
    case "paper-button":
      playerChoice = "paper";
      break;
    case "scissors-button":
      playerChoice = "scissors"
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
  let roundWinner = "";

  // Implementing the basic game logic
  if (playerHand === "rock" && computerHand === "scissors") {
    roundWinner = "player";
  } else if (playerHand === "scissors" && computerHand === "paper") {
    roundWinner = "player";
  } else if (playerHand === "paper" && computerHand === "rock") {
    roundWinner = "player";
  } else if (computerHand === "rock" && playerHand === "scissors") {
    roundWinner = "computer";
  } else if (computerHand === "scissors" && playerHand === "paper") {
    roundWinner = "computer";
  } else if (computerHand === "paper" && playerHand === "rock") {
    roundWinner = "computer";
  };

  // Account for ties and stop the game
  if (playerHand === computerHand) {
    roundWinner = "tie";
  }
  return roundWinner;
}

function playRound(playerChoice, computerChoice) {
  // This function updates the choices text, calls the function that evaluates
  // who is the roundWinner of the round and sets scores accordingly
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

  // Update the UI and check if game is over
  updateScoreUI();
  getMatchWinner();
}

function updateScoreUI() {
  // Function responsible for updating the UI every time a round is played

  playerScoreText.textContent = "Player score: " + playerScore;
  computerScoreText.textContent = "Computer score: " + computerScore; 

}

function getMatchWinner() {
  let gameWinner = "";
  
  // When the total score hits 5, it's game over.
  if (playerScore + computerScore === 5 && !isGameOver) {

    isGameOver = true;

    if (playerScore > computerScore) {
      gameWinner = "player"
    } else if (playerScore < computerScore) {
      gameWinner = "computer";
    }
    
    // Disable the buttons
    const buttonsToDisable = document.querySelectorAll(".rps-button");
    buttonsToDisable.forEach( (btn) => {
      btn.disabled = true;
    } );
    displayGameOverSection(gameWinner);
    
  }
}

function displayGameOverSection(winner) {
  // Function responsible for updating the lower center area of the view and displaying winner and
  // reset game button

  const matchWinner = getMatchWinner();

  // Game Over Area updateScoreUI
  const gameOverText = document.createElement("div");
  const resetButton = document.createElement("button");
  resetButton.textContent = "Play again?";

  gameOverText.textContent = (matchWinner === "player") ? "You win the match!" : "You lose! Computer wins the match!";
  gameOverArea.appendChild(gameOverText);
  gameOverArea.appendChild(resetButton);

  // Clicking the reset button will restore the game to default;
  resetButton.addEventListener("click", () => location.reload()); // It simply reloads the page!

}

function playGame() {
  if(!isGameOver) {
    // Play a round everytime the user clicks an option
    playerChoiceButtons.addEventListener("click", (ev) => playRound(getPlayerChoice(ev), getComputerChoice()));
  }
}

playGame();




