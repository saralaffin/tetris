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
  const Squares = Grid.querySelectorAll("div");
  const Score = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  const width = 10;

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
  console.log(random);
  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      Squares[currentPosition + index].classList.add("tetromino");
    });
  }

  function undraw() {
    current.forEach((index) => {
      Squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  let timerId = setInterval(moveDown, 1000);

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

      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (i) => (currentPosition + i) % width === 0
    );

    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((i) =>
        Squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    }
  }
  document.addEventListener("keyup", control);
});
