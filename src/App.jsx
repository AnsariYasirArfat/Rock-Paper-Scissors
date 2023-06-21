import { useState, useEffect } from "react";

const App = () => {
  const choices = ["rock", "paper", "scissors"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [roundResult, setRoundResult] = useState("Round 1");
  const [userScore, setUserScore] = useState(0);
  const [finalResult, setFinalResult] = useState("Play The Rounds");
  const [computerScore, setComputerScore] = useState(0);
  const [roundCount, setRoundCount] = useState(1);

  const handleUserChoice = (userInput) => {
    setUserChoice(choices[userInput]);
    console.log(`userChoice ${choices[userInput]}`);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
    console.log(`ComputerChoice ${choices[randomIndex]}`);
  };

  useEffect(() => {
    if (userChoice && computerChoice) {
      if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
      ) {
        setRoundResult("You win!");
        setUserScore((prevScore) => prevScore + 1);
      } else if (userChoice === computerChoice) {
        setRoundResult("It's a tie!");
      } else {
        setRoundResult("Computer wins!");
        setComputerScore((prevScore) => prevScore + 1);
      }
    }
  }, [userChoice, computerChoice]);

  useEffect(() => {
    if (roundCount === 3) {
      // Final result
      if (userScore > computerScore) {
        setFinalResult("Congratulations! You won the game!");
      } else if (userScore < computerScore) {
        setFinalResult("Computer won the game. Better luck next time!");
      } else {
        setFinalResult("It's a tie! The game ended in a draw.");
      }
    }
  }, [userScore, computerScore]);

  const handleNextRound = () => {
    if (roundCount === 3) {
      // Reset scores and round count
      setUserScore(0);
      setComputerScore(0);
      setRoundCount(1);
      setFinalResult(""); // Reset the final result here

      // Reset user and computer choices
      setUserChoice("");
      setComputerChoice("");
      setRoundResult("Start the game");
    } else {
      setRoundCount((prevCount) => prevCount + 1);
      setUserChoice("");
      setComputerChoice("");
      setRoundResult(`Round ${roundCount + 1}`);
    }
  };

  const handlePlayAgain = () => {
    setUserChoice("");
    setComputerChoice("");
    setRoundResult("Round 1");
    setUserScore(0);
    setComputerScore(0);
    setRoundCount(1);
    setFinalResult(
      finalResult.includes("Computer")
        ? "Computer Won last Game"
        : finalResult.includes("tie")
        ? "It's a tie"
        : "You won the Last Game"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
      {roundResult && <p className="text-lg mb-4">{roundResult}</p>}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`p-4 bg-blue-500 text-white font-bold rounded-md ${
            userChoice === "rock" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleUserChoice(0)}
          disabled={!!userChoice}
        >
          Rock
        </button>
        <button
          className={`p-4 bg-blue-500 text-white font-bold rounded-md ${
            userChoice === "paper" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleUserChoice(1)}
          disabled={!!userChoice}
        >
          Paper
        </button>
        <button
          className={`p-4 bg-blue-500 text-white font-bold rounded-md ${
            userChoice === "scissors" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleUserChoice(2)}
          disabled={!!userChoice}
        >
          Scissors
        </button>
      </div>
      {roundCount < 3 && userChoice && computerChoice && (
        <button
          className="p-4 bg-blue-500 text-white font-bold rounded-md"
          onClick={handleNextRound}
        >
          Go To Next Round {roundCount + 1}
        </button>
      )}
      <p className="text-lg">Round: {roundCount} / 3</p>
      <p className="text-lg">User Score: {userScore}</p>
      <p className="text-lg">Computer Score: {computerScore}</p>
      <h1>{finalResult}</h1>
      {roundCount === 3 && userChoice && computerChoice && (
        <div>
          <button
            className="p-4 bg-blue-500 text-white font-bold rounded-md mt-4"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
