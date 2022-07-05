let gridWidth = 4;
let gridContainer = document.getElementById("grid-container");

for (let i = 0; i < gridWidth * gridWidth; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add("square")
    gridContainer.appendChild(square);
}

