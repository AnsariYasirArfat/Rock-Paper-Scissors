import { useState, useEffect } from "react";

const App = () => {
  const choices = ["rock", "paper", "scissors"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [roundResult, setRoundResult] = useState("Start the game");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const handleUserChoice = (userInput) => {
    setUserChoice(choices[userInput]);
    console.log(`User choice ${choices[userInput]}`);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
    console.log(`Computer choice ${choices[randomIndex]}`);
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
        >
          Rock
        </button>
        <button
          className={`p-4 bg-blue-500 text-white font-bold rounded-md ${
            userChoice === "paper" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleUserChoice(1)}
        >
          Paper
        </button>
        <button
          className={`p-4 bg-blue-500 text-white font-bold rounded-md ${
            userChoice === "scissors" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleUserChoice(2)}
        >
          Scissors
        </button>
      </div>

      <p className="text-lg">User Score: {userScore}</p>
      <p className="text-lg">Computer Score: {computerScore}</p>
    </div>
  );
};

export default App;
