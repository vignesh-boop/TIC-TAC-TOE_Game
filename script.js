document.body.style.height = "100vh";
document.body.style.width = "100%";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.overflow = "hidden";

// link of the fonts
let link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Carter+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
document.head.appendChild(link);
document.body.style.fontFamily = "Poppins, sans-serif";
document.body.style.fontWeight = 800;

// frontpage background vedio
let backgroundVedio = document.createElement("video");
backgroundVedio.src = "asserts/backgroundVedio1.mp4";
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
    gameBoardBackgroundVedio.muted = true;
    gameBoardBackgroundVedio.autoplay = true;
    gameBoardBackgroundVedio.loop = true;
    gameBoardBackgroundVedio.style.objectFit = "cover";
    gameBoardBackgroundVedio.style.position = "fixed";
    gameBoardBackgroundVedio.style.zIndex = "-1";
    gameBoardBackgroundVedio.style.width = "100%";
    gameBoardBackgroundVedio.style.left = "0";
    document.body.append(gameBoardBackgroundVedio);
}

let topHeading = document.createElement("h1");
topHeading.textContent = "TIC TAC TEO GAME";
topHeading.style.fontFamily = "Poppins, sans-serif";
topHeading.style.fontWeight = "800";
topHeading.style.color = "white";
document.body.append(topHeading);

let outputText = document.createElement("h2");
outputText.style.color = "white";
outputText.style.marginTop = "20px";
document.body.append(outputText);

window.onload = function () {
    let frontBackground = document.createElement("div");
    frontBackground.style.display = "flex";
    frontBackground.style.justifyContent = "center";
    frontBackground.style.alignItems = "center";
    frontBackground.style.gap = "50px";

    let startButton = document.createElement("button");
    startButton.style.height = "60px";
    startButton.style.width = "200px";
    startButton.style.borderRadius = "20px";
    startButton.textContent = "Start Game";
    frontBackground.appendChild(startButton);

    startButton.addEventListener("click", () => {
        startButton.remove();

        let pVspButton = document.createElement("button");
        pVspButton.textContent = "Player v/s Player";
        pVspButton.style.borderRadius = "20px";
        pVspButton.style.height = "60px";
        pVspButton.style.width = "200px";

        let pVscButton = document.createElement("button");
        pVscButton.textContent = "Player v/s Bot";
        pVscButton.style.height = "60px";
        pVscButton.style.width = "200px";
        pVscButton.style.borderRadius = "20px";

        frontBackground.appendChild(pVspButton);
        frontBackground.appendChild(pVscButton);

        pVspButton.addEventListener("click", () => {
            pVscButton.remove();
            pVspButton.remove();
            backgroundVedio.remove();
            secondBackground();
            createGameBoard(frontBackground);
        });

        pVscButton.addEventListener("click", () => {
            pVscButton.remove();
            pVspButton.remove();

            let easyButton = document.createElement("button");
            easyButton.textContent = "Easy";
            easyButton.style.height = "50px";
            easyButton.style.width = "175px";
            easyButton.style.borderRadius = "20px";

            let mediumButton = document.createElement("button");
            mediumButton.textContent = "Medium";
            mediumButton.style.height = "50px";
            mediumButton.style.width = "175px";
            mediumButton.style.borderRadius = "20px";

            let hardButton = document.createElement("button");
            hardButton.textContent = "Hard";
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

    topHeading.textContent = boardTopDisplay;
    topHeading.style.color = "brown";

    let board = document.createElement("div");
    board.style.display = "grid";
    board.style.gridTemplateColumns = "repeat(3,100px)";
    board.style.gridTemplateRows = "repeat(3,100px)";
    board.style.gap = "5px";
    board.style.marginTop = "20px";

    let xYellowStarGif = `<img src="./asserts/star-19.gif" width="80" height="80">`;
    let yBlueStarGif = `<img src="./asserts/starfish-20931.gif" width="80" height="80">`;

    let currentPlayer = xYellowStarGif;
    let cells = [];

    for (let index = 0; index < 9; index++) {
        let cell = document.createElement("button");
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.fontSize = "24px";
        cell.style.backgroundColor = "#ffffff36";
        cell.style.borderRadius = "6px";
        cell.style.border = "1.5px solid lightblue";
        cell.style.backdropFilter = "blur(4px)";
        cell.style.boxShadow = "0px 0px 20px skyblue";

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
            alert("Y Wins");
            outputText.textContent = "Y WINS!";
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
    document.body.append(resetButtonDiv);

    let resetButton = document.createElement("Button");
    resetButton.textContent = "Reset";
    resetButton.style.width = "200px";
    resetButton.style.height = "40px";
    resetButton.style.borderRadius = "20px";
    resetButton.style.position = "relative";
    resetButton.style.top = "20px";
    resetButtonDiv.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
        for (let element of resetButtons) {
            element.innerHTML = "";
            element.disabled = false;
            element.removeAttribute("data-player");
        }
        outputText.textContent = "";
        resetButton.remove();
    });
}
