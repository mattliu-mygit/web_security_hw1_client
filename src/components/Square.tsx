import React from "react";
import { toast } from "react-toastify";
import { BOARD_DIMENSIONS } from "./App";

const SQUARE_DIMENSIONS = 1.9;

type SquarePropType = {
  x: number;
  y: number;
  boardState: Array<Array<Number>>;
  setBoardState: Function;
  player: number;
  setPlayer: Function;
  resetGame: Function;
};

const Square = (props: SquarePropType) => {
  const handleClick = () => {
    const newBoardState = [...props.boardState];
    if (newBoardState[props.x][props.y] === 0) {
      newBoardState[props.x][props.y] = props.player;
      if (checkWin(newBoardState)) {
        toast.dismiss();
        toast.success((props.player === 1 ? "Black" : "White") + " has won!");
        props.resetGame();
      } else {
        const newPlayer = props.player === 1 ? 2 : 1;
        props.setPlayer(newPlayer);
        toast.dismiss();
        toast(`${props.player === 2 ? "Black" : "White"}'s turn!`, {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          progress: undefined,
        });
      }
    } else {
      toast.error("Invalid move!");
    }
    props.setBoardState(newBoardState);
  };

  const checkWin = (newBoardState: Number[][]): boolean => {
    let x: number = props.x;
    let y: number = props.y;
    let count: number = -1;
    // together
    while (
      x >= 0 &&
      y <= BOARD_DIMENSIONS &&
      newBoardState[x][y] === props.player
    ) {
      count++;
      if (count === 5) return true;
      x--;
      y++;
    }

    x = props.x;
    y = props.y;
    while (
      x <= BOARD_DIMENSIONS &&
      y >= 0 &&
      newBoardState[x][y] === props.player
    ) {
      count++;
      if (count === 5) return true;
      x++;
      y--;
    }

    // together
    count = -1;
    x = props.x;
    y = props.y;
    while (x >= 0 && y >= 0 && newBoardState[x][y] === props.player) {
      count++;
      if (count === 5) return true;
      x--;
      y--;
    }

    x = props.x;
    y = props.y;
    while (
      x <= BOARD_DIMENSIONS &&
      y <= BOARD_DIMENSIONS &&
      newBoardState[x][y] === props.player
    ) {
      count++;
      if (count === 5) return true;
      x++;
      y++;
    }

    // together
    count = -1;
    x = props.x;
    y = props.y;
    while (y >= 0 && newBoardState[x][y] === props.player) {
      count++;
      if (count === 5) return true;
      y--;
    }

    x = props.x;
    y = props.y;
    while (y <= BOARD_DIMENSIONS && newBoardState[x][y] === props.player) {
      count++;
      if (count === 5) return true;
      y++;
    }

    // together
    x = props.x;
    y = props.y;
    count = -1;
    while (x >= 0 && newBoardState[x][y] === props.player) {
      count++;
      if (count === 5) return true;
      x--;
    }

    x = props.x;
    y = props.y;
    while (x <= BOARD_DIMENSIONS && newBoardState[x][y] === props.player) {
      count++;
      if (count === 5) return true;
      x++;
    }
    return false;
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          border: "solid",
          borderWidth: "0.01rem",
          width: `${SQUARE_DIMENSIONS}rem`,
          height: `${SQUARE_DIMENSIONS}rem`,
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.boardState[props.x][props.y] > 0 ? (
          <div
            style={{
              borderRadius: "50%",
              border: "solid",
              borderWidth: "0.05rem",
              backgroundColor:
                props.boardState[props.x][props.y] === 1 ? "black" : "white",
              height: "1rem",
              width: "1rem",
            }}
          ></div>
        ) : null}
      </button>
    </>
  );
};

export default Square;
