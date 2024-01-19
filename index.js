let playerScore  = 0;
let computerScore = 0;

function getPlayerChoice() {

  let playerChoice;
  let promptedInput = prompt("Enter Rock, Paper or Scissors").toLowerCase();

  // Check if the user choice is viable, and if yes the function will return it as the player's choice
  if (promptedInput === "rock" || promptedInput === "paper"|| promptedInput === "scissors") {
    playerChoice = promptedInput;
  } else {
    // The game will restart if the player entered an invalid input;
    getPlayerChoice();
  }
  return playerChoice;
}
  
function getComputerChoice() {
  
  let computerChoice;

  // The computer's choice is tied to a random number between one and three, every number is a choice
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

function playRound(playerChoice, computerChoice) {

  // Tha game state is summed up by these variables
  let winner;
  let winningHand;
  let losingHand;
  let isTie = false;

  // Displaying player and computer choices before executing the game logic
  console.log("Player choose:", playerChoice);
  console.log("Computer choose:", computerChoice);
  
  // Checks which hand wins according to rock, paper, scissors rules
  if (playerChoice === "rock" && computerChoice === "scissors" 
  || playerChoice === "scissors" && computerChoice === "paper"
  || playerChoice === "paper" && computerChoice === "rock") {
    
    // The winner and his choice are stored in the below variables to be displayed and the end of round
    winner = "Player";
    winningHand = playerChoice;
    losingHand = computerChoice;
    playerScore++; // And clearly the score is updated every round;

  } else if (computerChoice === "rock" && playerChoice === "scissors" 
  || computerChoice === "scissors" && playerChoice === "paper"
  || computerChoice === "paper" && playerChoice === "rock") {

    winner = "Computer";
    winningHand = computerChoice;
    losingHand = playerChoice;
    computerScore++;

  } else if (playerChoice === computerChoice) {
    // The code will also account for the case of a tie and will...
    isTie = true;
  }

  // ...reset the round and start again if there is no winner
  if (!isTie) {
    return `${winner} wins! ${winningHand} beats ${losingHand}!`
  } else {
    console.log("It's a tie! The game starts again!");
    playRound(getPlayerChoice(), getComputerChoice());
  }
}

function game() {
  // The game winner is decide in a best-of-five gauntlet
  for (let rounds = 1; rounds <= 5; rounds++) {
    console.log(playRound(getPlayerChoice(), getComputerChoice()));
  }

  // After the last round the scores are compared for declaring a winner of the entire game
  if (playerScore > computerScore) {
    console.log("Player wins with a score of:", playerScore);
    console.log("Computer score was:", computerScore);
  } else {
    console.log("Computer wins with a score of:", computerScore);
    console.log("Player score was:", computerScore);
  }
}

game();