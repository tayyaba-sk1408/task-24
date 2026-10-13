
const choices = ["rock", "paper", "scissors"];

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultCard = document.querySelector(".result-card");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const playerMoveElement = document.getElementById("player-move");
const computerMoveElement = document.getElementById("computer-move");
const choiceButtons = document.querySelectorAll(".choice");
const resetButton = document.getElementById("reset-button");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getRoundResult(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function displayRound(player, computer, result) {
  playerMoveElement.textContent = player;
  computerMoveElement.textContent = computer;
  resultCard.className = `result-card ${result}`;

  if (result === "win") {
    resultTitle.textContent = "You win this round!";
    resultMessage.textContent =
      `${capitalize(player)} beats ${computer}. Great move!`;
  } else if (result === "lose") {
    resultTitle.textContent = "Computer wins this round";
    resultMessage.textContent =
      `${capitalize(computer)} beats ${player}. Try again!`;
  } else {
    resultTitle.textContent = "It's a draw!";
    resultMessage.textContent =
      "You both chose the same move.";
  }
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getRoundResult(playerChoice, computerChoice);

  if (result === "win") {
    playerScore++;
  } else if (result === "lose") {
    computerScore++;
  }

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  displayRound(playerChoice, computerChoice, result);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  playerMoveElement.textContent = "—";
  computerMoveElement.textContent = "—";

  resultCard.className = "result-card";
  resultTitle.textContent = "Ready to play?";
  resultMessage.textContent =
    "Select Rock, Paper, or Scissors to start a round.";
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetButton.addEventListener("click", resetGame);
