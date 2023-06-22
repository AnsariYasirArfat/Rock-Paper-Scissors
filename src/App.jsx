import { useState, useEffect } from "react";
import rock from "./assets/rock.jpg";
import paper from "./assets/paper.jpg";
import scissors from "./assets/scissors.jpg";

const App = () => {
  const choices = ["rock", "paper", "scissors"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [roundResult, setRoundResult] = useState("Round 1");
  const [userScore, setUserScore] = useState(0);
  const [finalResult, setFinalResult] = useState("Play The Rounds");
  const [computerScore, setComputerScore] = useState(0);
  const [roundCount, setRoundCount] = useState(1);

  // Button elements change on hover
  const [isHoveredOnRockButton, setIsHoveredOnRockButton] = useState(false);
  const [isHoveredOnPaperButton, setIsHoveredOnPaperButton] = useState(false);
  const [isHoveredOnScissorsButton, setIsHoveredOnScissorsButton] =
    useState(false);
  // For Rock button
  const mouseEnterRockButton = () => {
    setIsHoveredOnRockButton(true);
  };
  const mouseLeaveRockButtton = () => {
    setIsHoveredOnRockButton(false);
  };
  // for Paper button
  const mouseEnterPaperButton = () => {
    setIsHoveredOnPaperButton(true);
  };
  const mouseLeavePaperButtton = () => {
    setIsHoveredOnPaperButton(false);
  };
  // For Scissors button
  const mouseEnterScissorsButton = () => {
    setIsHoveredOnScissorsButton(true);
  };
  const mouseLeaveScissorsButtton = () => {
    setIsHoveredOnScissorsButton(false);
  };

  // Input From User's choice
  const handleUserChoice = (userInput) => {
    setUserChoice(choices[userInput]);
    console.log(`userChoice ${choices[userInput]}`);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
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
        setRoundResult(`You win! Round ${roundCount}.`);

        setUserScore(userScore + 1);
      } else if (userChoice === computerChoice) {
        setRoundResult(`Tie! No winner in Round ${roundCount}.`);
      } else {
        setRoundResult(`Computer Wins! Round ${roundCount}.`);

        setComputerScore(computerScore + 1);
      }
    }
  }, [userChoice, computerChoice, roundCount]);

  useEffect(() => {
    if (roundCount === 3 && userChoice && computerChoice) {
      // Final result
      if (userScore > computerScore) {
        setFinalResult("Congratulations! You are the winner of the game.");
      } else if (userScore < computerScore) {
        setFinalResult("Computer Wins the Game. Better luck next time.");
      } else if (userScore === computerScore) {
        setFinalResult("Draw! The game ended in a tie.");
      }
    }
  }, [roundCount, userScore, computerScore, userChoice, computerChoice]);

  const handleNextRound = () => {
    if (roundCount === 3) {
      // Reset scores and round count
      setUserScore(0);
      setComputerScore(0);
      setRoundCount(1);

      // Reset user and computer choices
      setUserChoice("");
      setComputerChoice("");
    } else {
      setUserChoice("");
      setComputerChoice("");
      setRoundCount((prevCount) => prevCount + 1);
      setRoundResult(`Round ${roundCount + 1}`);
    }
    setFinalResult(() => {
      if (userScore > computerScore) {
        return "You are winning!";
      } else if (userScore < computerScore) {
        return "Computer's winning";
      } else {
        return "No one Winning, Keep playing";
      }
    });
  };

  const handlePlayAgain = () => {
    setUserChoice("");
    setComputerChoice("");
    setRoundResult("Round 1");
    setUserScore(0);
    setComputerScore(0);
    setRoundCount(1);
    setFinalResult(() => {
      if (userScore > computerScore) {
        return "You Won The Last Game";
      } else if (userScore < computerScore) {
        return "Computer Won The Last Game";
      } else {
        return "No One Won The Last game";
      }
    });
  };

  return (
    <div className="container p-4 lg:p-8 mx-auto">
      <h1 className="text-center p-4 bg-sky-300 text-2xl lg:text-4xl text-sky-900 font-bold mb-5 lg:mb-20">
        Rock Paper Scissors
      </h1>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-bold text-teal-700 mb-2 lg:mb-8 h-20 ">
        {finalResult}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center mb-4">
        <p className="text-base md:text-xl font-bold justify-self-center mb-4 text-center">
          Your Score: {userScore}
        </p>

        {roundResult && (
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-sky-700 justify-self-center mb-4 ">
            {roundResult}
          </p>
        )}

        <p className="text-base md:text-xl font-bold justify-self-center text-center mb-4">
          Computer&apos;s Score: {computerScore}
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-3 items-center mb-10 lg:mb-5 h-96">
        <button
          className={`justify-self-center lg:justify-self-end p-2 bg-sky-500 text-white font-bold rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 ease-in-out duration-500 shadow-xl shadow-sky-500 hover:shadow-2xl hover:shadow-sky-950  ${
            userChoice ? "hidden" : ""
          }`}
          onClick={() => handleUserChoice(0)}
          disabled={!!userChoice}
          onMouseEnter={mouseEnterRockButton}
          onMouseLeave={mouseLeaveRockButtton}
        >
          {isHoveredOnRockButton && (
            <img
              src={rock}
              alt="Rock"
              className="rounded-full w-full h-full object-center object-cover"
            />
          )}
          {!isHoveredOnRockButton && (
            <span className="text-base md:text-xl font-bold">Rock</span>
          )}
        </button>
        <button
          className={`justify-self-center lg:justify-self-center p-2 bg-sky-500 text-white font-bold rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 ease-in-out duration-500 shadow-xl shadow-sky-500 hover:shadow-2xl hover:shadow-sky-950  ${
            userChoice ? "hidden" : ""
          }`}
          onClick={() => handleUserChoice(1)}
          disabled={!!userChoice}
          onMouseEnter={mouseEnterPaperButton}
          onMouseLeave={mouseLeavePaperButtton}
        >
          {isHoveredOnPaperButton && (
            <img
              src={paper}
              alt="Paper"
              className="rounded-full w-full h-full object-center object-cover "
            />
          )}
          {!isHoveredOnPaperButton && (
            <span className="text-base md:text-xl font-bold">Paper</span>
          )}
        </button>
        <button
          className={`justify-self-center lg:justify-self-start p-2 bg-sky-500 text-white font-bold rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 ease-in-out duration-500 shadow-xl shadow-sky-500 hover:shadow-2xl hover:shadow-sky-950  ${
            userChoice ? "hidden" : ""
          }`}
          onClick={() => handleUserChoice(2)}
          disabled={!!userChoice}
          onMouseEnter={mouseEnterScissorsButton}
          onMouseLeave={mouseLeaveScissorsButtton}
        >
          {isHoveredOnScissorsButton && (
            <img
              src={scissors}
              alt="Scissors"
              className="rounded-full w-full h-full object-center object-cover "
            />
          )}
          {!isHoveredOnScissorsButton && (
            <span className="text-base md:text-xl font-bold">Scissors</span>
          )}
        </button>
        {userChoice && (
          <p className="justify-self-center text-xl md:text-2xl xl:text-3xl font-bold text-yellow-500 ">
            You chose: {userChoice}
          </p>
        )}
        {roundCount < 3 && userChoice && computerChoice && (
          <button
            className="justify-self-center p-4 bg-sky-500 hover:bg-sky-600  text-base md:text-xl text-yellow-200 font-bold rounded-full w-52 md:w-60"
            onClick={handleNextRound}
          >
            Go To Next Round {roundCount + 1}
          </button>
        )}
        {roundCount === 3 && userChoice && computerChoice && (
          <button
            className="justify-self-center p-4 bg-yellow-200 hover:bg-yellow-300 text-base md:text-xl text-sky-800 font-bold rounded-full w-52  md:w-60"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        )}
        {computerChoice && (
          <p className="justify-self-center text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-teal-700 ">
            Computer chose: {computerChoice}
          </p>
        )}
      </div>
      <p className="text-xl md:text-3xl font-semibold text-center">
        Round: {roundCount} / 3
      </p>
    </div>
  );
};

export default App;
