document.body.style.height ="100vh";
document.body.style.width ="100%";
document.body.style.display="flex";
document.body.style.flexDirection="column";
document.body.style.height ="100vh";
document.body.style.justifyContent="center";
document.body.style.alignItems="center";
document.body.style.overflow="hidden";


// link of the fonts
let link = document.createElement("link");
link.href="https://fonts.googleapis.com/css2?family=Carter+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
document.head.appendChild(link);
document.body.style.fontFamily="oppins,sans-serif"
document.body.style.fontWeight=800;

// frontpage background vedio

let backgroundVedio = document.createElement("video");
backgroundVedio.src ="asserts/backgroundVedio1.mp4";
backgroundVedio.autoplay=true;
backgroundVedio.muted=true;
backgroundVedio.loop=true;
backgroundVedio.playsInline=true;
backgroundVedio.style.position="fixed";
backgroundVedio.style.objectFit ="cover";
backgroundVedio.style.zIndex="-1";
document.body.append(backgroundVedio);

// secong background vedio
function secondBackground(){
    backgroundVedio.remove();
    let gameBoardBackgroundVedio = document.createElement("video");
     gameBoardBackgroundVedio.src="asserts/244754_small.mp4";
     gameBoardBackgroundVedio.muted=true;
     gameBoardBackgroundVedio.autoplay=true;
     gameBoardBackgroundVedio.loop=true;
     gameBoardBackgroundVedio.style.objectFit="cover";
     gameBoardBackgroundVedio.style.position="fixed";
     gameBoardBackgroundVedio.style.zIndex ="-1";
     gameBoardBackgroundVedio.style.width="100%";
     gameBoardBackgroundVedio.style.left="0";

     document.body.append(gameBoardBackgroundVedio);
     
}

window.onload = function(){
    

    let frontBackground = document.createElement("div");
    frontBackground.style.display ="flex";
    frontBackground.style.justifyContent="center";
    // frontBackground.style.height="100vh";
    // frontBackground.style.width="100%";
    frontBackground.style.alignItems="center";
    frontBackground.style.gap="50px";


    let startButton = document.createElement("button");
    startButton.style.height ="60px";
    startButton.style.width = "200px";
    startButton.style.borderRadius="20px";
    startButton.textContent="Start Game";
    frontBackground.appendChild(startButton);

    
    // player option button and itsfunctions
    
    startButton.addEventListener("click",()=>{
        
        // After clicking the start button i remove the sttart button
        startButton.remove();
        
        // Button creations and appending
        let pVspButton = document.createElement("button");
            pVspButton.textContent = "Player v/s Player";
            pVspButton.style.borderRadius="20px"
            pVspButton.style.height ="60px";
            pVspButton.style.width = "200px";
        
        let pVscButton = document.createElement("button");
            pVscButton.textContent = "Player v/s Bot";
            pVscButton.style.height ="60px";
            pVscButton.style.width = "200px";
            pVscButton.style.borderRadius="20px"
        
        frontBackground.appendChild(pVspButton);
        frontBackground.appendChild(pVscButton);

        // easy medium hard logic and creating the elements

        pVspButton.addEventListener("click",()=>{

            pVscButton.remove();
            pVspButton.remove();
            backgroundVedio.remove();
            secondBackground();
            
            createGameBoard(frontBackground);
        });

        pVscButton.addEventListener("click",()=>{
            pVscButton.remove();
            pVspButton.remove();

            // creating three buttons

             let easyButton = document.createElement("button");
            easyButton.textContent="Easy";
            easyButton.style.height ="50px";
            easyButton.style.width = "175px";
            easyButton.style.borderRadius="20px";
            
            
            let mediumButton = document.createElement("button");
            mediumButton.textContent="Medium";
            mediumButton.style.height ="50px";
            mediumButton.style.width = "175px";
            mediumButton.style.borderRadius="20px";
            
            
            let hardButton = document.createElement("button");
            hardButton.textContent="Hard";
            hardButton.style.height ="50px";
            hardButton.style.width = "175px";
            hardButton.style.borderRadius="20px";
        

            frontBackground.appendChild(easyButton);
            frontBackground.appendChild(mediumButton);
            frontBackground.appendChild(hardButton);

             function removeFunction(){
                easyButton.remove();
                mediumButton.remove();
                hardButton.remove();
            }
            
            easyButton.addEventListener("click",()=>{
                removeFunction();
                createGameBoard(frontBackground,"bot","easy");
                secondBackground();
            });

             mediumButton.addEventListener("click",()=>{
                removeFunction();
                createGameBoard(frontBackground,"bot","medium");
                secondBackground();
            });

             hardButton.addEventListener("click",()=>{
                removeFunction();
                createGameBoard(frontBackground,"bot","hard");
                secondBackground();
            });
            
        });
        
    });
    document.body.append(frontBackground);
}
    
    let topHeading = document.createElement("h1");
    topHeading.textContent="TIC TAC TEO GAME";
    topHeading.style.fontFamily=" oppins, sans-serif"
    topHeading.style.fontWeight="800";

    document.body.append(topHeading);

    
     

// function to the 3*3 board
function createGameBoard(parentDiv,mode,difficulty){
    



    

    let boardTopDisplay = (difficulty==="easy")?"EASY"
                            :(difficulty==="medium")?"MEDIUM"
                            :(difficulty==="hard")?"HARD":"";

     topHeading.textContent=boardTopDisplay;
     topHeading.style.color="brown";
     
    

    // seperating the grid colums and rows
    let board = document.createElement("div");
    board.style.display ="grid";
    board.style.gridTemplateColumns = "repeat(3,100px)";
    board.style.gridTemplateRows = "repeat(3,100px)";
    board.style.gap = "5px";
    board.style.marginTop ="20px";

    let currentPlayer = "X";
    let cells=[];

    // creating the 9 cells
    for(let index =0;index<9;index++){
        let cell = document.createElement("button");
        cell.style.width ="100px";
        cell.style.height="100px";
        cell.style.fontSize="24px";
        cell.style.backgroundColor="lightblue";
        cell.style.borderRadius="6px";
        cell.style.border="4px solid lightbrown";


        cell.addEventListener("click",()=>{

            if(cell.textContent==""){
                cell.textContent=currentPlayer;
                cell.disabled=true;
                if(checkWinner()){
                    alert(currentPlayer + "Wins!");
                    outputText.textContent=`${currentPlayer} WINS !`;
                    disableAllButtons();
                    resetOptions(cells,parentDiv);
                    return;
                }else if(isDraw()){
                    alert("Game Draw");
                    outputText.textContent="GAME DRAW !";
                    resetOptions(cells,parentDiv);
                    return;
                }

                // bot condition
                if(mode === "bot"){
                    if(currentPlayer=="X"){
                           currentPlayer="O";
                           setTimeout(botMove,500);
                    }
                }else{
                    currentPlayer= currentPlayer=="X"?"O":"X";
                }
            }
        });
        
        cells.push(cell);
        board.appendChild(cell);    
    }
parentDiv.appendChild(board);

    // function for the bot move

    function botMove(){
        let emptyCells = cells.filter(c => c.textContent == "");
        if(emptyCells.length == 0)return;

        // for easy button
        if(difficulty ==="easy"){
            let randomIndex = Math.floor(Math.random()*emptyCells.length);
            emptyCells[randomIndex].textContent="O";


        // for medium logic
            }else if(difficulty == "medium"){
                let bestMove = findWinningMove("O")||findWinningMove("X");
                if(bestMove !== null){
                    cells[bestMove].textContent="O";
                }else{
                    let randomIndex = Math.floor(Math.random()*emptyCells.length);
                    emptyCells[randomIndex].textContent="O";
                }

          // logic for hard
            }else if(difficulty == "hard"){
                let bestMove = findWinningMove("O")||findWinningMove("X");
                if(bestMove !== null){
                    cells[bestMove].textContent="O";
                }else{
                    let randomIndex = Math.floor(Math.random()*emptyCells.length);
                    emptyCells[randomIndex].textContent="O";
                }

            }
            if(checkWinner()){
                alert("O Wins");
                resetOptions(cells,board);
                disableAllButtons();
                return;
            }else if(isDraw()){
                resetOptions(cells,board);
                alert("Draw Game");
                return;
            }
            currentPlayer="X";
    }


    function checkWinner(){
        const winCombinations =[[0,1,2],[3,4,5],[6,7,8],    //for rows
                                [0,3,6],[1,4,7],[2,5,8],    //for columns
                                [0,4,8],[2,4,6]];   //for diagonals

        //combination ckeck
        return winCombinations.some(combo=>{
            let [a,b,c]=combo;
            return(
                cells[a].textContent == currentPlayer && 
                cells[b].textContent == currentPlayer && 
                cells[c].textContent== currentPlayer
            );
        }) ;
    }

        // finding the winning mpove
    function findWinningMove(Player){

           const winCombinations =[[0,1,2],[3,4,5],[6,7,8],    //for rows
                                [0,3,6],[1,4,7],[2,5,8],    //for columns
                                [0,4,8],[2,4,6]];    //diagnols

        for(let combo of winCombinations){
            let[a,b,c] = combo;
            let values = [cells[a].textContent,cells[b].textContent,cells[c].textContent];
            let count = values.filter(val=>val==Player).length;
            let emptyIndex =values.indexOf("");

            if(count ==2 && emptyIndex !== -1){
                return combo[emptyIndex];
            }
        }
        return null;
    }

    // Disable all butten text content

    function disableAllButtons(){
        for(let cell of cells){
            cell.disabled=true;
        }
    }
    // checks the match is draw 
    
    function isDraw(){
        return cells.every(cell=>cell.textContent!=="");
    }
}
  
function resetOptions(resetButtons,container){
    let resetButtonDiv = document.createElement("div");
    document.body.append(resetButtonDiv);

    let resetButton = document.createElement("Button");
    resetButton.textContent = "Reset";
    resetButton.style.width="200px";
    resetButton.style.height="40px";
    resetButton.style.borderRadius="20px";
    resetButton.style.position="relative";
    resetButton.style.top="20px";
    resetButtonDiv.appendChild(resetButton);


    resetButton.addEventListener("click",()=>{
        for (let element of resetButtons) {
                element.textContent="";
                element.disabled=false;
        }
        resetButton.remove();
    });
}
