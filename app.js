let gridWidth = 5;
let initialparcelNumber = 3;
let invalidAmount = 4;
let energy = "⚡⚡⚡";
let gridContainer = document.getElementById("grid-container");
let squares = [];
let validSquares = [];
let currentId = 0;
let isNewSquareAccessible = false;
let energyDisplay = document.getElementById("energy");
energyDisplay.innerText = energy;

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
    currentId = currentSquare.id;
    currentSquare.textContent = "🚶‍♂️"

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
    validParcelSquares[randomNumParcel].innerText = "📦"
}

function accessible(newSquare) {
    id = newSquare.id;
    let isNWCorner = parseInt(id) === 0;
    let isNECorner = parseInt(id) === gridWidth - 1;
    let isSWCorner = parseInt(id) === (gridWidth * gridWidth) - gridWidth;
    let isSECorner = parseInt(id) === (gridWidth * gridWidth) - 1;
    let isTopEdge = parseInt(id) < gridWidth - 1;
    let isBottomEdge = (parseInt(id) < (gridWidth * gridWidth) - 1) && (parseInt(id) > (gridWidth * gridWidth) - gridWidth);
    let isLeftEdge = (parseInt(id) % gridWidth === 0);
    let isRightEdge = ((parseInt(id) + 1) % gridWidth === 0);
    let isCentralSquare = (!(isTopEdge) && !(isBottomEdge) && !(isLeftEdge) && !(isRightEdge));

    //check NW corner
    if (isNWCorner) {
        if (parseInt(currentId) === (parseInt(id + 1))
            || parseInt(currentId) === gridWidth
            || parseInt(currentId) === (gridWidth + 1)) {
            isNewSquareAccessible = true;
        }
    }
    //check NE corner
    if (isNECorner) {
        if (parseInt(currentId) === (parseInt(id - 1))
            || parseInt(currentId) === (parseInt(id) + gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth)) {
            isNewSquareAccessible = true;
        }
    }
    //check SW corner
    if (isSWCorner) {
        if (parseInt(currentId) === (parseInt(id + 1))
            || parseInt(currentId) === (parseInt(id) - gridWidth)
            || parseInt(currentId) === (parseInt(id) - gridWidth + 1)) {
            isNewSquareAccessible = true;
        }
    }
    //check SE corner
    if (isSECorner) {
        if (parseInt(currentId) === (parseInt(id - 1))
            || parseInt(currentId) === parseInt(id) - gridWidth
            || parseInt(currentId) === (parseInt(id) - gridWidth - 1)) {
            isNewSquareAccessible = true;
        }
    }
    //check N edge 
    if (isTopEdge && !isNWCorner && !isNECorner) {
        if (parseInt(currentId) === (parseInt(id) + gridWidth)
            || parseInt(currentId) === (parseInt(id) + gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth + 1)
            || parseInt(currentId) === (parseInt(id) + 1)
            || parseInt(currentId) === (parseInt(id) - 1)) {
            isNewSquareAccessible = true;
        }
    }
    //check S edge
    if (isBottomEdge && !isSWCorner && !isSECorner) {
        if (parseInt(currentId) === (parseInt(id) - gridWidth)
            || parseInt(currentId) === (parseInt(id) - gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) - gridWidth + 1)
            || parseInt(currentId) === (parseInt(id) + 1)
            || parseInt(currentId) === (parseInt(id) - 1)) {
            isNewSquareAccessible = true;
        }
    }
    //check L edge
    if (isLeftEdge && !isNECorner && !isSECorner) {
        if (parseInt(currentId) === (parseInt(id) - gridWidth + 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth + 1)
            || parseInt(currentId) === (parseInt(id) + 1)
            || parseInt(currentId) === (parseInt(id) - gridWidth)
            || parseInt(currentId) === (parseInt(id) + gridWidth)) {
            isNewSquareAccessible = true;
        }
    }
    //check R edge
    if (isRightEdge && !isNWCorner && !isSWCorner) {
        if (parseInt(currentId) === (parseInt(id) - gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) - 1)
            || parseInt(currentId) === (parseInt(id) - gridWidth)
            || parseInt(currentId) === (parseInt(id) + gridWidth)) {
            isNewSquareAccessible = true;
        }
    }
    //check central Squares
    if (isCentralSquare) {
        if (parseInt(currentId) === (parseInt(id) + 1)
            || parseInt(currentId) === (parseInt(id) - 1)
            || parseInt(currentId) === (parseInt(id) - gridWidth)
            || parseInt(currentId) === (parseInt(id) - gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) - gridWidth + 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth)
            || parseInt(currentId) === (parseInt(id) + gridWidth - 1)
            || parseInt(currentId) === (parseInt(id) + gridWidth + 1)) {
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
        currentSquare.textContent = ""
        newSquare.classList.add("current");
        newSquare.textContent = "🚶‍♂️"
        currentId = newSquare.id;
        //if new position contains a parcel
        if (newSquare.classList.contains("parcel")) {
            energy = energy + "⚡";
            energyDisplay.innerText = energy;
            newSquare.classList.remove("parcel");
            newSquare.textContent = "🚶‍♂️";
            let validDestinationSquares = squares.filter(s => s.classList.contains("square-valid"))
                .filter(s => !s.classList.contains("current"))
                .filter(s => !s.classList.contains("destination"));
            const randomNumDestination = Math.floor(Math.random() * validDestinationSquares.length);
            validDestinationSquares[randomNumDestination].classList.add("destination");
        }
        // if new position is a destination
        if (newSquare.classList.contains("destination")) {
            energy = energy + "⚡⚡";
            energyDisplay.innerText = energy;
            newSquare.classList.remove("destination")
        }
        //consume energy and, with a probability of .5, create a new parcel
        energy = energy.slice(0, -1);
        energyDisplay.innerText = energy;
        //display danger
        if (energy.length < 3) {
            gridContainer.classList.add("danger");
        }
        if (energy.length < 2) {
            gridContainer.classList.add("extra-danger");
        }
        if (energy.length >= 3) {
            gridContainer.classList.remove("danger");
        }
        if (energy.length >= 2) {
            gridContainer.classList.remove("extra-danger");
        }
        if (energy.length === 0) {
            alert("you're dead :(")
        }
        if (document.querySelectorAll(".destination").length < 5) {
            if (energy.length < 2) {
                createParcel();
            } else if (Math.random() > .8) {
                createParcel();
            }
        }
        isNewSquareAccessible = false;
    }
}

createBoard()
