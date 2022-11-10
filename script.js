// ORIGINAL //

//Create 16x16 grid

let grid = document.getElementsByClassName("grid")[0];

function gridGenesis() {
  for (let i = 0; i < 257; i++) {
    let cell = document.createElement("div");
    cell.classList.add(i);
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  let cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.addEventListener("mousemove", mouseHover);
  }
}

gridGenesis();

// Initial Conditions

let mode = "black";
let rainbowN = 0;
let actualCell;

gridBorder = document.getElementById("gridBorder");
gridBorder = gridBorder.addEventListener(
  "mousemove",
  () => (actualCell = "outsideGrid")
);

// Buttons

reset = document.getElementById("reset");
reset = reset.addEventListener("click", resetGrid);

classic = document.getElementById("classic");
classic = classic.addEventListener("click", () => (mode = "black"));

eraser = document.getElementById("eraser");
eraser = eraser.addEventListener("click", () => (mode = "eraser"));

rainbow = document.getElementById("rainbow");
rainbow = rainbow.addEventListener("click", () => (mode = "rainbowCell"));

// Hover function

function mouseHover(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log(actualCell);
  let cellClases = e.target.classList;
  if (cellClases[0] != actualCell) {
    if (mode == "eraser") {
      cellClases.remove(cellClases[2]);
    } else {
      let currentClass = cellClases[2];
      if (!currentClass) {
        if (mode == "rainbowCell") {
          cellClases.add(`rainbowCell${rainbowN}`);
          rainbowN += 1;
        } else {
          cellClases.add(mode);
        }
      } else {
        if (mode == "rainbowCell") {
          cellClases.replace(currentClass, `rainbowCell${rainbowN}`);
          rainbowN += 1;
        }
      }
      actualCell = cellClases[0];
    }
    if (rainbowN == 7) {
      rainbowN = 0;
    }
  }
}

// Reset the grid function

function resetGrid() {
  do {
    userInput = prompt("How many cells do you want? (Between 1 to 100)");
  } while (
    userInput <= 0 ||
    userInput > 100 ||
    !(userInput == Math.floor(userInput))
  );

  grid.replaceChildren();

  for (let i = 0; i < userInput * userInput; i++) {
    let cell = document.createElement("div");
    cell.classList.add(i);
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  grid.style.cssText = `grid-template-columns: repeat(${userInput}, ${
    560 / userInput
  }px);
                                   grid-template-rows: repeat(${userInput}, ${
    560 / userInput
  }px)`;

  mode = "black";

  let cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.addEventListener("mousemove", mouseHover);
  }
}
