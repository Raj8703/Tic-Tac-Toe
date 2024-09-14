import Confetti from "react-confetti";
import Box from "./Box";
import { useEffect, useState } from "react";

// import "./style.css";
function Board() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [curSign, setCurSign] = useState("X");
  const [winner, setwinner] = useState("");
  const [isMatchDraw, setIsMatchDraw] = useState(false);

  const checkForWinner = () => {
    const checPosition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < checPosition.length; i++) {
      let [pos1, pos2, pos3] = checPosition[i]; //[0,1,2]
      if (
        boxes[pos1] !== "" &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        setwinner(boxes[pos1]);
        break;
      }
    }
  };

  const addSign = (idx) => {
    //if box is filled no need to do anything
    if (boxes[idx] !== "" || winner !== "") {
      return;
    }
    //update the boxes
    const newBoxes = boxes.slice();
    newBoxes[idx] = curSign;
    setBoxes(newBoxes);

    //update thes sign
    setCurSign(curSign === "O" ? "X" : "O");
  };

  const checkForDraw = () => {
    const allChecked = boxes.filter((box) => box === "").length === 0;
    if (winner === "" && allChecked) {
      setIsMatchDraw(true);
    }
  };

  useEffect(() => {
    checkForWinner();
    checkForDraw();
  }, [boxes]);

  const restartGame = () => {
    setBoxes(Array(9).fill(""));
    setwinner("");
    setCurSign("");
    setIsMatchDraw(false);
  };
  return (
    <>
      {winner !== "" && <Confetti />}
      {isMatchDraw && <h1>Match Draw</h1>}
      {winner !== "" && <h1>Winner is {winner}!!</h1>}
      <div className="board">
        {boxes.map((boxValue, idx) => (
          <Box sign={boxValue} addSign={() => addSign(idx)} />
        ))}
      </div>
      <button className="button" onClick={restartGame}>
        Restart
      </button>
    </>
  );
}

export default Board;
