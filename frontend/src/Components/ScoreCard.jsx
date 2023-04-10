import React from "react";

function ScoreCard(props) {
  const [winner, setWinner] = React.useState("");
  const [loser, setloser] = React.useState("");
  const [winnerScore, setwinnerScore] = React.useState("");
  const [loserScore, setloserScore] = React.useState("");
  const [tie, setTie] = React.useState(false);

  React.useEffect(() => {
    let s1 = +localStorage.getItem("score1");
    let s2 = +localStorage.getItem("score2");
    if (localStorage.getItem("single") == "true") {
      setwinnerScore(s1);
      setloserScore(0);
      setWinner("You");
      setloser("Not Applicable");
    } else if (s1 > s2) {
      setwinnerScore(s1);
      setloserScore(s2);
      setWinner("You");
      setloser("Player 2");
    } else if (s2 > s1) {
      setWinner(s2);
      setloserScore(s1);
      setWinner("Player 2");
      setloser("You");
    } else {
      setTie(true);
      setwinnerScore(s1);
      setloserScore(s1);
    }
  }, []);

  return (
    <div
      className="flex h-screen "
      style={{
        backgroundImage: `url(${"https://images.hdqwalls.com/download/captain-vs-captain-america-4k-v1-1920x1080.jpg"})`,
      }}
    >
      <div className="m-auto flex flex-col w-96 bg-white rounded-md shadow-md overflow-hidden">
        {tie ? (
          <div className="bg-blue-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Game Tie</h2>
          </div>
        ) : (
          <div className="bg-blue-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">{winner} wins!</h2>
          </div>
        )}

        <div className="flex justify-between px-4 py-2">
          <span className="text-lg font-bold">{winner}</span>
          <span className="text-lg">{winnerScore}</span>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <span className="text-lg font-bold">{loser}</span>
          <span className="text-lg">{loserScore}</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
