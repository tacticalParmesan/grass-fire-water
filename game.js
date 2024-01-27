// Global variables for handling game functionalities as score and DOM elements
let playerScore  = 0;
let computerScore = 0;

// Grabbing references for pre-existing elements to acces

// Scores
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");

// Choices
const playerChoiceImg = document.querySelector(".player-choice");
const computerChoiceImg = document.querySelector(".computer-choice");

// UI Sections
const roundResultText = document.querySelector("#round-result-text");
const gameOverArea = document.querySelector(".gameover-area");

// All the buttons are accessed with event delegation
const playerChoiceButtons = document.querySelector(".rps-buttons");

// Storing player choice according to button clicked - using event delegation
function getPlayerChoice(clickEvent) {
  let playerChoice = "";
  let target = clickEvent.target;

  switch(target.id) {

    case "bulbasaur":
    case "bulbasaur-button":
      playerChoice = "bulbasaur";
      break;

    case "squirtle":
    case "squirtle-button":
      playerChoice = "squirtle";
      break;

    case "charmander":
    case "charmander-button":
      playerChoice = "charmander"
      break;

    default:
      playerChoice = undefined;

  }
  return playerChoice
  
}


// Getting computer choice using an RNG
function getComputerChoice() {
  let computerChoice = "";

  // The computer's choice is tied to a random number between 1 and 3;
  let randomNumber = Math.floor(Math.random() * 3) + 1; // +1 To avoid 0
  switch (randomNumber) {
    case 1:
      computerChoice = "bulbasaur";
      break;
    case 2:
      computerChoice = "squirtle";
      break;
    case 3:
      computerChoice = "charmander"
      break;
  }
  return computerChoice;
}

function getRoundWinner(playerHand, computerHand) {
  let roundWinner = "";

  // Implementing the basic game logic
  if (playerHand === "bulbasaur" && computerHand === "squirtle") {
    roundWinner = "player";
  } else if (playerHand === "squirtle" && computerHand === "charmander") {
    roundWinner = "player";
  } else if (playerHand === "charmander" && computerHand === "bulbasaur") {
    roundWinner = "player";
  } else if (computerHand === "bulbasaur" && playerHand === "squirtle") {
    roundWinner = "computer";
  } else if (computerHand === "squirtle" && playerHand === "charmander") {
    roundWinner = "computer";
  } else if (computerHand === "charmander" && playerHand === "bulbasaur") {
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

  // Adding a check to stop the game if the player choice is invalid (blame me for actiong clever!)
  if (playerChoice === undefined) {return};

  updateBattleUI(playerChoice, computerChoice);
  let roundWinner = getRoundWinner(playerChoice, computerChoice);

  if (roundWinner === "player") {
    displayTextSlowly(roundResultText,`You win! ${capitalize(playerChoice)} has super effective moves againts ${capitalize(computerChoice)}.`);
    playerScore += 1;
  } else if (roundWinner === "computer") {
    displayTextSlowly(roundResultText,`You lose! ${capitalize(playerChoice)}'s move aren't very effective against ${capitalize(computerChoice)}.`);
    computerScore += 1;
  } else {
    displayTextSlowly(roundResultText, `Both ${capitalize(playerChoice)}'s power is even. It's a tie!`);
  }

  // Update the UI and check if game is over
  updateScoreUI();
  getMatchWinner();
}

function updateBattleUI(playerCritter, computerCritter) {
  // Fucntion responsible for updating the Battlefield Area UI with images and panels
  const playerCritterName = document.querySelector("#player-critter-name");
  const computerCritterName = document.querySelector("#computer-critter-name");

  playerCritterName.textContent = playerCritter[0].toUpperCase() + playerCritter.substring(1);
  computerCritterName.textContent = computerCritter[0].toUpperCase() + computerCritter.substring(1);;

  const panels = document.querySelectorAll(".panel")
  panels.forEach( (panel) => panel.setAttribute("style", "display: flex"));

  playerChoiceImg.setAttribute("src", `./assets/${playerCritter}-back.png`);
  playerChoiceImg.setAttribute("style", "width: 6rem; height: 6rem;");
  computerChoiceImg.setAttribute("src", `./assets/${computerCritter}.png`);
  computerChoiceImg.setAttribute("style", "width: 6rem; height: 6rem;");

}

function updateScoreUI() {
  // Function responsible for updating the UI every time a round is played

  playerScoreText.textContent = "Player score: " + playerScore;
  computerScoreText.textContent = "Computer score: " + computerScore; 

}

function getMatchWinner() {
  let gameWinner = "";
  
  // When the total score hits 5, it's game over.
  if (playerScore + computerScore === 5) {


    if (playerScore > computerScore) {
      gameWinner = "player"
    } else if (playerScore < computerScore) {
      gameWinner = "computer";
    }
    
    disableButtons();
    displayGameOverSection(gameWinner);
    
  }
}

function displayGameOverSection(winner) {
  // Function responsible for updating the lower center area of the view and displaying winner and
  // reset game button

  const matchWinner = winner;

  // Game Over Area updateScoreUI
  const gameOverText = document.createElement("div");
  const resetButton = document.createElement("button");
  resetButton.textContent = "Play again?";
  resetButton.setAttribute("id", "reset-button");

  gameOverText.textContent = (matchWinner === "player") ? "You win the match!" : "You lose! Computer wins the match!";
  gameOverText.setAttribute("id", "game-over-text");
  gameOverArea.appendChild(gameOverText);
  gameOverArea.appendChild(resetButton);

  // Clicking the reset button will restore the game to default;
  resetButton.addEventListener("click", () => location.reload()); // It simply reloads the page!

}

function playGame() {
    // Play a round everytime the user clicks an option
    playerChoiceButtons.addEventListener("mousedown", (ev) =>  playRound(getPlayerChoice(ev), getComputerChoice()));
}

// ---------- UTILITY FUNCTIONS ----------

function capitalize(text) {
  return text[0].toUpperCase() + text.substring(1);
}

function displayTextSlowly(element, text, delay=50) {
  // Show the text one character at the time, to achieve a really nostalgic effect!
  let count = 0;

  // While text is being shown, keep buttons disabled
  disableButtons()

  let typer = setInterval(() => {

    if (count != text.length) {
      count++;
      roundResultText.textContent = text.substring(0, count)
    } else {
      enableButtons();
      clearInterval(typer);

    }
  }, delay)
  
}

function disableButtons() {
      // Disable the buttons
      const buttonsToDisable = document.querySelectorAll(".rps-button");
      buttonsToDisable.forEach( (btn) => {
        btn.disabled = true;
      } );
}

function enableButtons() {
    // Disable the buttons
    const buttonsToDisable = document.querySelectorAll(".rps-button");
    buttonsToDisable.forEach( (btn) => {
      btn.disabled = false;
    } );
  }

// Start of the game
displayTextSlowly(roundResultText, "You have been challanged to battle! \n Who is going to move?", 25)
playGame();




