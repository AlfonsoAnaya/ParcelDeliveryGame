let gridWidth = 4;
let gridContainer = document.getElementById("grid-container");
let emptySquares = [0,2,7,15]
let buildingsSquares = [1,3,4,5,6,8,9,10,11,12,14]

for (let i = 0; i < gridWidth * gridWidth; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add("square")
    gridContainer.appendChild(square);
    if (emptySquares.includes(i)) {
        square.classList.add("square-empty")
    }
    if (buildingsSquares.includes(i)) {
        const building = document.createElement("div");
        building.classList.add("building");
        square.appendChild(building);
    }
}

