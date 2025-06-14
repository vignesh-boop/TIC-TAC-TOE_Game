
// link of the fonts
let link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Carter+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
document.head.appendChild(link);
document.body.style.fontFamily = "Poppins, sans-serif";
document.body.style.fontWeight = 800;


let levelButton = document.createElement("h2");
levelButton.id="levelButton";
document.body.append(levelButton)


// frontpage background vedio
let backgroundVedio = document.createElement("video");
backgroundVedio.src = "asserts/backgroundVedio1.mp4";
backgroundVedio.id = "video1"
backgroundVedio.autoplay = true;
backgroundVedio.muted = true;
backgroundVedio.loop = true;
backgroundVedio.playsInline = true;
backgroundVedio.style.position = "fixed";
backgroundVedio.style.objectFit = "cover";
backgroundVedio.style.zIndex = "-1";
document.body.append(backgroundVedio);

// second background vedio
function secondBackground() {
    backgroundVedio.remove();
    let gameBoardBackgroundVedio = document.createElement("video");
    gameBoardBackgroundVedio.src = "asserts/244754_small.mp4";
    gameBoardBackgroundVedio.id="video2"
    gameBoardBackgroundVedio.muted = true;
    gameBoardBackgroundVedio.autoplay = true;
    gameBoardBackgroundVedio.loop = true;
    gameBoardBackgroundVedio.style.objectFit = "cover";
    gameBoardBackgroundVedio.style.position = "fixed";
    gameBoardBackgroundVedio.style.zIndex = "-1";
    
    gameBoardBackgroundVedio.style.left = "0";
    document.body.append(gameBoardBackgroundVedio);
}

let topHeading = document.createElement("h1");
topHeading.textContent = "TIC TAC TOE GAME";
topHeading.id="heading";
topHeading.style.fontFamily = "Poppins, sans-serif";
topHeading.style.fontWeight = "800";
document.body.append(topHeading);

let outputText = document.createElement("h2");
outputText.style.color = "white";
outputText.style.marginTop = "20px";
document.body.append(outputText);

window.onload = function () {
    let frontBackground = document.createElement("div");
   frontBackground.id="frontBackground";


    let startButton = document.createElement("button");
    startButton.id ="startButton";
    startButton.textContent = "START GAME";
    frontBackground.appendChild(startButton);

    startButton.addEventListener("click", () => {
        startButton.remove();

        let pVspButton = document.createElement("button");
        pVspButton.textContent = "Player v/s Player";
        pVspButton.className="commonButtonPlayer";
        
        let pVscButton = document.createElement("button");
        pVscButton.textContent = "Player v/s Bot";  
        pVscButton.className="commonButtonPlayer";

        frontBackground.appendChild(pVspButton);
        frontBackground.appendChild(pVscButton);

        pVspButton.addEventListener("click", () => {
            pVscButton.style.display="none";
            pVspButton.style.display="none";
            backgroundVedio.remove();
            secondBackground();
            createGameBoard(frontBackground);
        });

        pVscButton.addEventListener("click", () => {
            pVscButton.style.display="none";
            pVspButton.style.display="none";

            let easyButton = document.createElement("button");
            easyButton.className="levelButtons"
            easyButton.className="levelButtons"
            easyButton.className="levelButtons"
            easyButton.textContent = "EASY";
            easyButton.style.height = "50px";
            easyButton.style.width = "175px";
            easyButton.style.borderRadius = "20px";

            let mediumButton = document.createElement("button");
            mediumButton.textContent = "MEDIUM";
            mediumButton.style.height = "50px";
            mediumButton.style.width = "175px";
            mediumButton.style.borderRadius = "20px";

            let hardButton = document.createElement("button");
            hardButton.textContent = "HARD";
            hardButton.style.height = "50px";
            hardButton.style.width = "175px";
            hardButton.style.borderRadius = "20px";

            frontBackground.appendChild(easyButton);
            frontBackground.appendChild(mediumButton);
            frontBackground.appendChild(hardButton);

            function removeFunction() {
                easyButton.remove();
                mediumButton.remove();
                hardButton.remove();
            }

            easyButton.addEventListener("click", () => {
                removeFunction();
                createGameBoard(frontBackground, "bot", "easy");
                secondBackground();
            });

            mediumButton.addEventListener("click", () => {
                removeFunction();
                createGameBoard(frontBackground, "bot", "medium");
                secondBackground();
            });

            hardButton.addEventListener("click", () => {
                removeFunction();
                createGameBoard(frontBackground, "bot", "hard");
                secondBackground();
            });
        });
    });

    document.body.append(frontBackground);
}

function createGameBoard(parentDiv, mode, difficulty) {
    let boardTopDisplay = (difficulty === "easy") ? "EASY"
        : (difficulty === "medium") ? "MEDIUM"
            : (difficulty === "hard") ? "HARD" : "";
    topHeading.remove();
    
    levelButton.textContent=boardTopDisplay
    levelButton.style.color = "brown";
    


    let board = document.createElement("div");
    board.id="board"
    board.style.display = "grid";
   

    let xYellowStarGif = `<img src="./asserts/star-19.gif" class="commonFish">`;
    let yBlueStarGif = `<img src="./asserts/starfish-20931.gif" class="commonFish">`;

    let currentPlayer = xYellowStarGif;
    let cells = [];

    for (let index = 0; index < 9; index++) {
        let cell = document.createElement("button");
        cell.id="cell"

        cell.addEventListener("click", () => {
            if (cell.innerHTML === "") {
                cell.innerHTML = currentPlayer;
                cell.setAttribute("data-player", currentPlayer === xYellowStarGif ? "X" : "Y");
                cell.disabled = true;
                cell.style.opacity = "1";

                if (checkWinner()) {
                    let winner = currentPlayer === xYellowStarGif ? "YELLOW" : "BLUE";
                    alert(winner + " Wins!");
                    outputText.textContent = `${winner} WINS!`;
                    disableAllButtons();
                    resetOptions(cells, parentDiv);
                    return;
                } else if (isDraw()) {
                    alert("Game Draw");
                    outputText.textContent = "GAME DRAW!";
                    resetOptions(cells, parentDiv);
                    return;
                }

                if (mode === "bot") {
                    setTimeout(botMove, 500);
                } else {
                    currentPlayer = currentPlayer === xYellowStarGif ? yBlueStarGif : xYellowStarGif;
                }
            }
        });

        cells.push(cell);
        board.appendChild(cell);
    }

    parentDiv.appendChild(board);

    function botMove() {
        let emptyCells = cells.filter(c => !c.getAttribute("data-player"));
        if (emptyCells.length === 0) return;

        let moveIndex;

        if (difficulty === "easy") {
            moveIndex = Math.floor(Math.random() * emptyCells.length);
        } else {
            let bestMove = findWinningMove("Y") || findWinningMove("X");
            if (bestMove !== null) {
                let cell = cells[bestMove];
                cell.innerHTML = yBlueStarGif;
                cell.setAttribute("data-player", "Y");
                cell.disabled = true;
                cell.style.opacity = "1";
                postBot();
                return;
            }
            moveIndex = Math.floor(Math.random() * emptyCells.length);
        }

        let cell = emptyCells[moveIndex];
        cell.innerHTML = yBlueStarGif;
        cell.setAttribute("data-player", "Y");
        cell.disabled = true;
        cell.style.opacity = "1";
        postBot();
    }

    function postBot() {
        if (checkWinner()) {
            alert("YELLOW Wins");
            outputText.textContent = "BLUE WINS!";
            disableAllButtons();
            resetOptions(cells, board);
            return;
        } else if (isDraw()) {
            alert("Draw Game");
            outputText.textContent = "GAME DRAW!";
            resetOptions(cells, board);
            return;
        }
        currentPlayer = xYellowStarGif;
    }

    function checkWinner() {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winCombinations.some(combo => {
            let [a, b, c] = combo;
            let aP = cells[a].getAttribute("data-player");
            let bP = cells[b].getAttribute("data-player");
            let cP = cells[c].getAttribute("data-player");
            return aP && aP === bP && bP === cP;
        });
    }

    function findWinningMove(player) {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winCombinations) {
            let [a, b, c] = combo;
            let vals = [cells[a], cells[b], cells[c]];
            let values = vals.map(cell => cell.getAttribute("data-player"));
            let count = values.filter(v => v === player).length;
            let emptyIndex = values.indexOf(null) !== -1 ? values.indexOf(null) : values.indexOf("");
            if (count === 2 && emptyIndex !== -1) {
                return combo[emptyIndex];
            }
        }
        return null;
    }

    function disableAllButtons() {
        for (let cell of cells) {
            cell.disabled = true;
            cell.style.opacity = "1";
        }
    }

    function isDraw() {
        return cells.every(cell => cell.getAttribute("data-player"));
    }
}

function resetOptions(resetButtons, container) {
    let resetButtonDiv = document.createElement("div");
    resetButtonDiv.id="resetButtonDiv";
    document.body.append(resetButtonDiv);

    let resetButton = document.createElement("Button");
    resetButton.textContent = "RESET";
    resetButton.className="resetButton";
    resetButtonDiv.appendChild(resetButton);

    let backButton = document.createElement("Button");
    backButton.textContent = "BACK";
    backButton.className="resetButton";
    resetButtonDiv.appendChild(backButton);

    resetButton.addEventListener("click", () => {
        for (let element of resetButtons) {
            element.innerHTML = "";
            element.disabled = false;
            element.removeAttribute("data-player");
        }
        outputText.textContent = "";
        resetButton.remove();
        backButton.style.display="none";
    });

//   backButton.addEventListener("click",()=>{
//     board.style.display="none";
//     resetButton.display="none"
//     backButton.style.display="none"
//     pVscButton.style.display="unset";
//     pVspButton.style.display="unset";
//   })
}
