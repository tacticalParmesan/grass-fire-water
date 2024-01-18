// GAME FUNCTIONALITIES

// Function to take the user input
function getPlayerChoice() {

  // User choice variable
  let playerChoice;

  // Prompt the user for rock, paper or scissor (case insensitive!)
  let promptedInput = prompt("Enter Rock, Paper or Scissors").toLowerCase();

  // Check if the user choice is viable (one of the three listed above)
  if (promptedInput === "rock"
  || promptedInput === "paper"
  || promptedInput === "scissors") {
    // If yes set the choice to that
    playerChoice = promptedInput;
  } else {
    // Else restart the game (Recursive I know!)
    return getPlayerChoice()
  }
  // Return the user choice 
  return playerChoice;
}
  
// Function to make the computer choose1 randomly
//   Computer choice variable
//   Get a random number between 1 and 3
//   If number is 1 rock, if 2 paper, if 3 scissor
//     Set the computerchoice variable accordingly
//   return the choice

// Function to play a round(takes computer and user choice as arguments)
//   Check which wins (RPS logic)
//   If player wins
//     return victory message
//   If computer wins
//     return defeat message
//   If it's a tie play again

// Main game function to combine the above
//   Computer score variable
//   Player score varible
//   Round count varible
//   Play the game five times
//   Compare scores to declare a winner
//   Higher score wins!