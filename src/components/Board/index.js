import React from "react";
import "./Board.scss";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const COLOR_MAPPING = [
  "#ec1e2a",
  "#fcb549",
  "#24b767",
  "#af63ad",
  "#6fcfe8",
  "#64b3f4",
  "#eadb13",
  "transparent",
];

const COLOR_TRIANGLE = [
  "#b21621",
  "#fca31a",
  "#1c8850",
  "#9c3c94",
  "#4e99b1",
  "#1374ad",
  "#e4de18",
  "transparent",
];

const WHITE_COLOR_ID = 7;

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const Board = () => {
  const canvasRef = React.useRef(null);
  const [over, setOver] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [boardCurrent, setBoardCurrent] = React.useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID))
  ); /* generate white board function */
  const [id, setId] = React.useState(Math.floor((Math.random() * 10) % 7));
  const rowPosRef = React.useRef(1);
  const [colPos, setColPos] = React.useState(3);
  const [rowPos, setRowPos] = React.useState(-1);
  const [activeLayout, setActiveLayout] = React.useState(0);
  /* move brick */
  const KEY_UP = "ArrowUp";
  const KEY_DOWN = "ArrowDown";
  const KEY_LEFT = "ArrowLeft";
  const KEY_RIGHT = "ArrowRight";
  /* create initial value */
  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;
    handleCompleteRows();
    drawBoard(ctx);
    drawBrick(id, ctx);
  }, [id, colPos, rowPos, activeLayout, boardCurrent]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      moveDown();
      console.log("move down");
    }, 500);
    return () => clearInterval(interval);
  });

  const moveLeft = () => {
    if (!checkCollision(colPos - 1, rowPos, activeLayout)) {
      setColPos(colPos - 1);
    }
  };

  const moveRight = () => {
    if (!checkCollision(colPos + 1, rowPos, activeLayout)) {
      setColPos(colPos + 1);
    }
  };

  /* check and create new brick */
  const moveDown = () => {
    if (!checkCollision(colPos, rowPos + 1, activeLayout)) {
      setRowPos(rowPos + 1);
    } else {
      handleLanded();
      setId(Math.floor((Math.random() * 10) % 7));
      setColPos(3);
      setRowPos(-1);
    }
  };
  const rotate = () => {
    if (!checkCollision(colPos, rowPos, (activeLayout + 1) % 4)) {
      setActiveLayout((activeLayout + 1) % 4);
    }
  };

  /* check collision */
  function checkCollision(nextCol, nextRow, nextLayout) {
    for (let i = 0; i < BRICK_LAYOUT[id][nextLayout].length; i++) {
      for (let j = 0; j < BRICK_LAYOUT[id][nextLayout][0].length; j++) {
        if (
          BRICK_LAYOUT[id][nextLayout][i][j] !== WHITE_COLOR_ID &&
          nextRow >= 0
        ) {
          if (
            nextCol + j < 0 ||
            nextCol + j >= COLS ||
            nextRow + i >= ROWS ||
            boardCurrent[i + nextRow][j + nextCol] !== WHITE_COLOR_ID
          )
            return true;
        }
      }
    }
  }

  window.onkeydown = (e) => {
    switch (e.code) {
      case KEY_LEFT:
        moveLeft();
        break;
      case KEY_RIGHT:
        moveRight();
        break;
      case KEY_DOWN:
        moveDown();
        break;
      case KEY_UP:
        rotate();
        break;
      default:
        break;
    }
  };
  function drawBoard(ctx) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        drawCell(ctx, j, i, boardCurrent[i][j]);
      }
    }
  }
  /* BRICK */
  /* draw cell function */
  function drawCell(ctx, colPos, rowPos, colorId) {
    ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    ctx.fillRect(
      colPos * BLOCK_SIZE,
      rowPos * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    /* draw border */
    ctx.strokeStyle = "#3131316e";
    ctx.strokeRect(
      colPos * BLOCK_SIZE,
      rowPos * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    // the triangle
    ctx.beginPath();
    ctx.moveTo(colPos * BLOCK_SIZE, rowPos * BLOCK_SIZE);
    ctx.lineTo(colPos * BLOCK_SIZE, rowPos * BLOCK_SIZE + BLOCK_SIZE);
    ctx.lineTo(
      colPos * BLOCK_SIZE + BLOCK_SIZE,
      rowPos * BLOCK_SIZE + BLOCK_SIZE
    );
    ctx.closePath();

    // the fill color
    ctx.fillStyle = COLOR_TRIANGLE[colorId] || COLOR_TRIANGLE[WHITE_COLOR_ID];
    ctx.fill();
  }

  function drawBrick(id, ctx) {
    for (let i = 0; i < BRICK_LAYOUT[id][activeLayout].length; i++) {
      for (let j = 0; j < BRICK_LAYOUT[id][activeLayout][0].length; j++) {
        if (BRICK_LAYOUT[id][activeLayout][i][j] !== WHITE_COLOR_ID) {
          drawCell(ctx, j + colPos, i + rowPos, id);
        }
      }
    }
  }

  function handleLanded() {
    if (rowPos <= 0) {
      setOver(true);
    }
    for (let i = 0; i < BRICK_LAYOUT[id][activeLayout].length; i++) {
      for (let j = 0; j < BRICK_LAYOUT[id][activeLayout][0].length; j++) {
        if (
          BRICK_LAYOUT[id][activeLayout][i][j] !== WHITE_COLOR_ID ||
          rowPos + 1 >= ROWS
        ) {
          boardCurrent[i + rowPos][j + colPos] = id;
        }
      }
    }
  }

  const handleReset = (e) => {
    setOver(false);
    if (over) {
      setId(Math.floor((Math.random() * 10) % 7));
      setBoardCurrent(
        Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID))
      );
    }
  };

  function handleCompleteRows() {
    const latestGrid = boardCurrent.filter((row) => {
      // row => []
      return row.some((col) => col === WHITE_COLOR_ID);
    });

    const newScore = ROWS - latestGrid.length; // => newScore = tong cong hang da hoan thanh
    const newRows = Array.from({ length: newScore }, () =>
      Array(COLS).fill(WHITE_COLOR_ID)
    );

    if (newScore) {
      setBoardCurrent([...newRows, ...latestGrid]);
      setScore((prev) => prev + newScore);
    }
  }

  const onClickUp = () => {
    rotate();
  };
  const onClickDown = () => {
    moveDown();
  };
  const onClickLeft = () => {
    moveLeft();
  };
  const onClickRight = () => {
    moveRight();
  };

  return (
    <div className="container-board">
      <h3 className="over">{over && "Game Over"}</h3>
      <canvas className="board" ref={canvasRef}></canvas>
      <div className="controls">
        <div className="controls_top">
          <h2 className="title">Tetris game</h2>
          <div className="score_counter">
            Score:
            <span id="score">{score}</span>
          </div>
        </div>
        <button className="btn-play" id="play" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="mobile-controls">
        <div className="top">
          <button className="btn btn-up" onClick={onClickUp}>
            up
          </button>
        </div>
        <div className="bottom">
          <button className="btn btn-left" onClick={onClickLeft}>
            left
          </button>
          <button className="btn btn-down" onClick={onClickDown}>
            down
          </button>
          <button className="btn btn-right" onClick={onClickRight}>
            right
          </button>
        </div>
      </div>
      <div className="coming-soon">
        <h2>Coming soon...</h2>
      </div>
    </div>
  );
};

export default Board;
