document.addEventListener("DOMContentLoaded", () => {
  const Grid = document.querySelector(".grid");
  for (let i = 0; i < 200; i++) {
    let box = document.createElement("div");
    Grid.appendChild(box);
  }
  for (let j = 0; j < 10; j++) {
    let box = document.createElement("div");
    box.classList.add("taken");
    Grid.appendChild(box);
  }
  for (let j = 0; j < 16; j++) {
    let box = document.createElement("div");
    // box.classList.add("taken");
    document.querySelector(".mini-grid").appendChild(box);
  }
  let Squares = Array.from(Grid.querySelectorAll("div"));
  const ScoreDisplay = document.querySelector("#score");
  let score = 0;
  const StartBtn = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  const colors = ["orange", "red", "purple", "green", "blue"];

  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      Squares[currentPosition + index].classList.add("tetromino");
      Squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  function undraw() {
    current.forEach((index) => {
      Squares[currentPosition + index].classList.remove("tetromino");
      Squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((i) =>
        Squares[currentPosition + i + width].classList.contains("taken")
      )
    ) {
      current.forEach((i) =>
        Squares[currentPosition + i].classList.add("taken")
      );
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      upNextShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (i) => (currentPosition + i) % width === 0
    );

    if (!isAtLeftEdge) currentPosition--;

    if (
      current.some((i) =>
        Squares[currentPosition + i].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (i) => (currentPosition + i + 1) % width === 0
    );

    if (!isAtRightEdge) currentPosition++;

    if (
      current.some((i) =>
        Squares[currentPosition + i].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  function control(e) {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }
  document.addEventListener("keyup", control);

  const UpNextSquares = document.querySelectorAll(".mini-grid div");
  const upNextWidth = 4;
  const upNextIndex = 0;

  const upNextTetrominoes = [
    [1, upNextWidth + 1, upNextWidth * 2 + 1, 2],
    [0, upNextWidth, upNextWidth + 1, upNextWidth * 2 + 1],
    [1, upNextWidth, upNextWidth + 1, upNextWidth + 2],
    [0, 1, upNextWidth, upNextWidth + 1],
    [1, upNextWidth + 1, upNextWidth * 2 + 1, upNextWidth * 3 + 1],
  ];

  function upNextShape() {
    UpNextSquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach((i) => {
      UpNextSquares[upNextIndex + i].classList.add("tetromino");
      UpNextSquares[upNextIndex + i].style.backgroundColor = colors[nextRandom];
    });
  }

  StartBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      upNextShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => Squares[index].classList.contains("taken"))) {
        score += 10;
        ScoreDisplay.innerHTML = score;
        row.forEach((index) => {
          Squares[index].classList.remove("taken");
          Squares[index].classList.remove("tetromino");
          Squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = Squares.splice(i, width);
        Squares = squaresRemoved.concat(Squares);
        Squares.forEach((cell) => Grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      current.some((i) =>
        Squares[currentPosition + i].classList.contains("taken")
      )
    ) {
      ScoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }
});
