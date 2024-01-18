// GAME FUNCTIONALITIES

function getPlayerChoice() {
  // Function to take the user input

  // User choice variable
  let playerChoice;

  // Prompt the user for rock, paper or scissor (case insensitive!)
  let promptedInput = prompt("Enter Rock, Paper or Scissors").toLowerCase();

  // Check if the user choice is viable (one of the three listed above)
  if (promptedInput === "rock" || promptedInput === "paper"|| promptedInput === "scissors") {
    // If yes set the choice to that
    playerChoice = promptedInput;
  } else {
    // Else restart the game (Recursive I know!)
    return getPlayerChoice()
  }
  // Return the user choice 
  return playerChoice;
}
  
function getComputerChoice() {
  // Function to make the computer choose randomly
  
  // Computer choice variable
  let computerChoice;

  // Get a random number between 1 and 3
  let randomNumber = Math.floor(Math.random() * 3) + 1; // +1 To avoid 0
  console.log("Randnum:", randomNumber);
  // If number is 1 rock, if 2 paper, if 3 scissor
  // Set the computer choice variable accordingly:
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
  
  //   return the choice
  return computerChoice;
}

function playRound(playerChoice, computerChoice) {
  // Function to play a round(takes computer and user choice as arguments)
  let winner;
  let winningHand;
  let losingHand;
  let isTie = false;

  // Displaying player and computer choices
  console.log("Player choose:", playerChoice);
  console.log("Computer choose:", computerChoice);
  
  // Check which hand wins (RPS logic)
  if (playerChoice === "rock" && computerChoice === "scissors" 
  || playerChoice === "scissors" && computerChoice === "paper"
  || playerChoice === "paper" && computerChoice === "rock") {
    winner = "Player";
    winningHand = playerChoice;
    losingHand = computerChoice;
  } else if (computerChoice === "rock" && playerChoice === "scissors" 
  || computerChoice === "scissors" && playerChoice === "paper"
  || computerChoice === "paper" && playerChoice === "rock") {
    winner = "Computer";
    winningHand = computerChoice;
    losingHand = playerChoice;
  } else if (playerChoice === computerChoice) {
    isTie = true;
  }

  if (!isTie) {
    return `${winner} wins! ${winningHand} beats ${losingHand}!`
  } else {
    console.log("It's a tie! The game starts again!");
    return playRound(getPlayerChoice(), getComputerChoice());
  }
}

// Main game function to combine the above
//   Computer score variable
//   Player score varible
//   Round count varible
//   Play the game five times
//   Compare scores to declare a winner
//   Higher score wins!