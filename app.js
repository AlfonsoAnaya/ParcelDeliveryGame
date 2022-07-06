let gridWidth = 4;
let parcelNumber = 3;
let invalidAmount = 3;
let gridContainer = document.getElementById("grid-container");
let squares = [];
let validSquares = []


/*for (let i=0; i<parcelNumber; i++) {
    let randomSquare = Math.floor(Math.random() * buildingSquares.length);
    randomSquares.push(buildingSquares[randomSquare])
}*/

//create board
function createBoard() {
    const invalidArray = Array(invalidAmount).fill("square-empty");
    const validArray = Array(gridWidth * gridWidth - invalidAmount).fill("square-valid");
    const gameArray = validArray.concat(invalidArray);
    const shuffledArray = gameArray.sort(() => Math.random() -.5);
    //create individual squares (including empty ones)
    for (let i = 0; i < gridWidth * gridWidth; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", i);
        square.classList.add(shuffledArray[i]);
        gridContainer.appendChild(square);
        squares.push(square);
    }
    //create starting point 
    validSquares = squares.filter(s => s.classList.contains("square-valid"));
    validSquares[Math.floor(Math.random() * validSquares.length)].classList.add("current");
    //create parcels
    for (let i = 0; i < parcelNumber; i++) {
        createParcel()
    }
    //addEventListeners to move
    validSquares.forEach(s => s.addEventListener("click", ()=>move(s)))
}

function createParcel() {
    let validParcelSquares = squares.filter(s => s.classList.contains("square-valid")).filter(s=> !s.classList.contains("current"));
    const randomNumParcel = Math.floor(Math.random() * validParcelSquares.length);
    validParcelSquares[randomNumParcel].classList.add("parcel");
    const randomNumDestination = Math.floor(Math.random() * validParcelSquares.length);
    validParcelSquares[randomNumDestination].classList.add("destination");
}

function move(newSquare) {
    currentSquare = validSquares.find(s=>s.classList.contains("current"));
    console.log(currentSquare);
    currentSquare.classList.remove("current");
    newSquare.classList.add("current");

}

createBoard()
