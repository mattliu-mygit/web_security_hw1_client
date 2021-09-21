import { useEffect, useState } from "react";
import Square from "./Square";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BOARD_DIMENSIONS = 19;

function App() {
  const [board, setBoard] = useState<Array<Array<any>>>([]);
  const [boardState, setBoardState] = useState<Array<Array<Number>>>([]);
  const [setupMode, setSetupMode] = useState<Number>(0);
  const [player, setPlayer] = useState<number>(1);

  // Board Update
  useEffect(() => {
    if (boardState.length === BOARD_DIMENSIONS) {
      const boardArr: Array<Array<any>> = [];
      for (let y = 0; y < BOARD_DIMENSIONS; y++) {
        const bRow: Array<any> = [];
        for (let x = 0; x < BOARD_DIMENSIONS; x++) {
          bRow.push(
            <div key={`${y + "," + x}`}>
              <Square
                x={x}
                y={y}
                boardState={boardState}
                setBoardState={setBoardState}
                player={player}
                setPlayer={setPlayer}
                resetGame={resetGame}
              />
            </div>
          );
        }
        boardArr.push(bRow);
      }
      setBoard(boardArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState]);

  //Board State Setup
  useEffect(() => {
    if (setupMode === 0) {
      const boardStateArr: Array<Array<Number>> = [];
      for (let x = 0; x < BOARD_DIMENSIONS; x++) {
        const bSRow: Array<Number> = [];
        for (let y = 0; y < BOARD_DIMENSIONS; y++) {
          bSRow.push(0);
        }
        boardStateArr.push(bSRow);
      }
      toast(`${player === 1 ? "Black" : "White"}'s turn!`, {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        progress: undefined,
      });
      setBoardState(boardStateArr);
      setSetupMode(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState]);

  const resetGame = () => {
    setBoard([]);
    setBoardState([]);
    setSetupMode(0);
    setPlayer(1);
  };

  return (
    <>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>5-In-A-Row!</h1>
        <div style={{ margin: "auto", paddingBottom: "4rem" }}>
          {board.map((row: Array<any>, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
              key={index + "row"}
            >
              {row}
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
