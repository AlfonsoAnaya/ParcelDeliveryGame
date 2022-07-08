let gridWidth = 4;
let initialparcelNumber = 2;
let invalidAmount = 3;
let energy = 3;
let gridContainer = document.getElementById("grid-container");
let squares = [];
let validSquares = [];
let currentId = 0;
let isNewSquareAccessible = false;


/*for (let i=0; i<parcelNumber; i++) {
    let randomSquare = Math.floor(Math.random() * buildingSquares.length);
    randomSquares.push(buildingSquares[randomSquare])
}*/

//create board
function createBoard() {
    const invalidArray = Array(invalidAmount).fill("square-empty");
    const validArray = Array(gridWidth * gridWidth - invalidAmount).fill("square-valid");
    const gameArray = validArray.concat(invalidArray);
    const shuffledArray = gameArray.sort(() => Math.random() - .5);

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
    currentSquare = validSquares[Math.floor(Math.random() * validSquares.length)]
    currentSquare.classList.add("current");
    currentId = currentSquare.id
    console.log(`current id is ${currentId}`)

    //create parcels
    for (let i = 0; i < initialparcelNumber; i++) {
        createParcel()
    }

    //addEventListeners to move
    validSquares.forEach(s => s.addEventListener("click", () => move(s)))
}

function createParcel() {
    let validParcelSquares = squares.filter(s => s.classList.contains("square-valid"))
        .filter(s => !s.classList.contains("current"))
        .filter(s => !s.classList.contains("parcel"));
    const randomNumParcel = Math.floor(Math.random() * validParcelSquares.length);
    validParcelSquares[randomNumParcel].classList.add("parcel");
}

function accessible(newSquare) {
    //check NW corner
    id = newSquare.id
    if (parseInt(id) === 0) {
        if(parseInt(currentId) === parseInt(id+1) 
        || parseInt(currentId) ===  gridWidth 
        || parseInt(currentId) === gridWidth +1) {
            isNewSquareAccessible = true;
        }
    }
    //check NE corner
    if (parseInt(id) === gridWidth -1) {
        if(parseInt(currentId) === parseInt(id-1) 
        || parseInt(currentId) === parseInt(id) + gridWidth  -1
        || parseInt(currentId) === parseInt(id) + gridWidth) {
            isNewSquareAccessible = true;
        }
    }
    //check SW corner
    if (parseInt(id) === (gridWidth * gridWidth) - gridWidth) {
        if(parseInt(currentId) === parseInt(id+1) 
        || parseInt(currentId) === parseInt(id) - gridWidth
        || parseInt(currentId) === parseInt(id) - gridWidth +1) {
            isNewSquareAccessible = true;
        }
    }
    //check SE corner
    if (parseInt(id) === (gridWidth * gridWidth) - 1) {
        if(parseInt(currentId) === parseInt(id-1) 
        || parseInt(currentId) === parseInt(id) - gridWidth
        || parseInt(currentId) === parseInt(id) - gridWidth -1) {
            isNewSquareAccessible = true;
        }
    }
}

function move(newSquare) {
    // if clicked square is adjacent to current display new position
    currentSquare = validSquares.find(s => s.classList.contains("current"));
    accessible(newSquare)
    if (isNewSquareAccessible) {
        currentSquare.classList.remove("current");
        newSquare.classList.add("current");
        currentId = newSquare.id;
        console.log(`current id is ${currentId}`)
        //if new position contains a parcel
        if (newSquare.classList.contains("parcel")) {
            energy++;
            newSquare.classList.remove("parcel");
            let validDestinationSquares = squares.filter(s => s.classList.contains("square-valid"))
                .filter(s => !s.classList.contains("current"))
                .filter(s => !s.classList.contains("destination"));
            const randomNumDestination = Math.floor(Math.random() * validDestinationSquares.length);
            validDestinationSquares[randomNumDestination].classList.add("destination");
        }
        // if new position is a destination
        if (newSquare.classList.contains("destination")) {
            energy = energy + 2;
            newSquare.classList.remove("destination")
        }
        //consume energy and, with a probability of .5, create a new parcel
        energy--;
        console.log(energy)
        if (energy < 2) {
            createParcel();
        } else if (Math.random() > .8) {
            createParcel();
        }
        if (energy === 0) {
            alert("you'redead :(")
        }
        isNewSquareAccessible = false;
    }


}



createBoard()
