let gridWidth = 4;
let parcelNumber = 3;
let invalidAmount = 3;
let gridContainer = document.getElementById("grid-container");


/*for (let i=0; i<parcelNumber; i++) {
    let randomSquare = Math.floor(Math.random() * buildingSquares.length);
    randomSquares.push(buildingSquares[randomSquare])
}*/

//create board
function createBoard() {
    const invalidArray = Array(invalidAmount).fill("empty");
    const validArray = Array(gridWidth * gridWidth - invalidAmount).fill("square");
    const gameArray = validArray.concat(invalidArray);
    const shuffledArray = gameArray.sort(() => Math.random() -.5);
    for (let i = 0; i < gridWidth * gridWidth; i++) {
        //create individual squares (including empty ones)
        const square = document.createElement("div");
        square.setAttribute("id", i);
        square.classList.add(shuffledArray[i]);
        console.log(square)
        gridContainer.appendChild(square);
    }
}

createBoard()