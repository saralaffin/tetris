document.addEventListener("DOMContentLoaded", () => {
  const Grid = document.querySelector(".grid");
  for (let i = 0; i < 200; i++) {
    let box = document.createElement("div");
    Grid.appendChild(box);
  }
});
