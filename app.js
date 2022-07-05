let gridWidth = 4;
let squareGridWidth = 3;
let parcelNumber = 5;
let gridContainer = document.getElementById("grid-container");
let emptySquares = [0,2,7,15];
let validSquares = [1,3,4,5,6,8,9,10,11,12,13,14];
let buildingSquares = [1,3,4,5,6,8,9,10,11,12,14];
let eastRoad = [4,8,9,10,12,13];
let westRoad = [5,9,10,11,13,14];
let centralEWRoad = [13];
let northRoad = [5,8,12,14];
let southRoad = [1,4,8,10];
let southEastRoad = [1,6];
let northWestRoad = [6,11];
let southWestRoad = [3];
let northEastRoad = [6];
let randomSquares = []

for (let i=0; i<parcelNumber; i++) {
    let randomSquare = Math.floor(Math.random() * buildingSquares.length);
    randomSquares.push(buildingSquares[randomSquare])
}
//create grid
for (let i = 0; i < gridWidth * gridWidth; i++) {
    //create individual squares (including empty ones)
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add("square");
    gridContainer.appendChild(square);
    if (emptySquares.includes(i)) {
        square.classList.add("square-empty")
    }
    // create roads and buildings
    if (validSquares.includes(i)) {
        for (let j = 0; j < 9; j++) {
            const roadBlock = document.createElement("div");
            roadBlock.classList.add("road-block");
            roadBlock.classList.add(j)
            square.appendChild(roadBlock);
            if (buildingSquares.includes(i) && j===4) {
                roadBlock.classList.add("building")
            }
            if (eastRoad.includes(i) && j===5) {
                roadBlock.classList.add("e-road")
            }
            if (westRoad.includes(i) && j===3) {
                roadBlock.classList.add("w-road")
            }
            if (centralEWRoad.includes(i) && j===4) {
                roadBlock.classList.add("w-road")
            }
            if (northRoad.includes(i) && j===1) {
                roadBlock.classList.add("n-road")
            }
            if (southRoad.includes(i) && j===7) {
                roadBlock.classList.add("s-road")
            }
            if (southEastRoad.includes(i) && j===8) {
                roadBlock.classList.add("se-road")
            }
            if (northWestRoad.includes(i) && j===0) {
                roadBlock.classList.add("nw-road")
            }
            if (southWestRoad.includes(i) && j===6) {
                roadBlock.classList.add("sw-road")
            }
            if (northEastRoad.includes(i) && j===2) {
                roadBlock.classList.add("ne-road")
            }
        }
    }
    // create parcles using randomSquares array
    if (randomSquares.includes(i)) {
        square.classList.add("parcel")
    }
}



