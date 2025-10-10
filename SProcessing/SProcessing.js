let a = [[8,7,6,5,4,3,1,9,2],
         [5,4,3,2,1,9,7,6,8],
         [2,1,9,8,7,6,4,3,5],

         [1,9,8,7,6,5,3,2,4],
         [4,3,2,1,9,8,6,5,7],
         [7,6,5,4,3,2,9,8,1],

         [3,2,1,9,8,7,5,4,6],
         [6,5,4,3,2,1,8,7,9],
         [9,8,7,6,5,4,2,1,3]];
         
let cellSize = 50;
let boardSize = cellSize * 9;

let board = new Array(9);
for (let i = 0; i < 9; i++) {
    board[i] = new Array(9).fill(0);
}

let rows;
let cols = - 1;
let dragAnswer = -1;
let offsetX;
let offsetY;

let wrongCells = new Array(9);
for (let i = 0; i < 9; i++) {
    wrongCells[i] = new Array(9).fill(false);
}

let wrongCount = 3;
let gameOver = false;
let gameWin = false;
let saveBtnX, saveBtnY, saveBtnW = 100, saveBtnH = 40;
let loadBtnX, loadBtnY, loadBtnW = 100, loadBtnH = 40;
let fileInput;
let FixedNumber = new Array(9);
for (let i = 0; i < 9; i++) {
  FixedNumber[i] = new Array(9).fill(false);
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(20);
    gameOver = false;
    gameWin = false;
    randomBlank();
    fillBoard();
    removeNumber(board);
    setFixedNumbers();
    drawBoard();
    drawNumInBoard();
    drawAnswer();
    fileInput = createFileInput(handleFile);
    fileInput.hide();
}

function draw(){
    background(250);
    
    offsetX = (width - boardSize) / 2;
    offsetY = (height - cellSize * 11) / 2;
    
    push();
    translate(offsetX, offsetY); 
    drawBoard();
    drawNumInBoard();
    drawAnswer();
    text("Chance : " + wrongCount ,offsetX-453, offsetY+383);
    highlightSelectedCell();    
    
    if (dragAnswer != -1) {
        drawDraggingAnswer(offsetX, offsetY);
    }
    pop();
    drawSaveButton();
    drawLoadButton();
    endGame();
}


function drawBoard(){
    fill(0);
    for(let i = 0; i <= 9; i++){
        if((i % 3) == 0){
            strokeWeight(3);
         } else {
             strokeWeight(1);
         }
    
         line(0, cellSize*i, boardSize, cellSize*i);
         line(cellSize*i, 0, cellSize*i, boardSize);
    }
}

function randomBlank(){
    let blanks = [];
    for(let i = 0; i < 4; i++){
        blanks.push(int(random(0,9)));
    }
}

function fillBoard(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = a[row][col];
        }
    }
}

function removeNumber(board){
    for (let row = 0; row < board.length; row++) {
        let blank = int(random(2, 6));    
        for (let b = 0; b < blank; b++) {
            let col = int(random(9));      
            while (board[row][col] == 0) {
                col = int(random(9));
            }     
            board[row][col] = 0;
        }
    }
}

function drawNumInBoard() {
  textAlign(CENTER, CENTER);
  textSize(20);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0) {
        if (FixedNumber[row][col]) {
          fill(0);
        } else if (isDuplicate(row, col, board[row][col])) {
          fill(200, 0, 0); 
        } else {
          fill(0, 200, 100); 
        }
        text(board[row][col], col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
      }
    }
  }
}

function mouseClicked(){
    let mx = mouseX - offsetX;
    let my = mouseY - offsetY;
    if (mx >= 0 && mx < boardSize && my >= 0 && my < boardSize) {
        rows = floor(my / cellSize);
        cols = floor(mx / cellSize);
    } else {
        rows = -1;
        cols = -1;
    }
    print("(" + rows + ", " + cols + ")");
}

function drawAnswer(){
  fill(0);
  strokeWeight(3);

  line(0, cellSize * 10, cellSize * 9, cellSize * 10);
  line(0, cellSize * 11, cellSize * 9, cellSize * 11);

  for (let i = 0; i <= 9; i++) {
    line(i * cellSize, cellSize * 10, i * cellSize, cellSize * 11);
  }

  textAlign(CENTER, CENTER);
  textSize(30);
  for (let col = 0; col < 9; col++) {
    text(col + 1, col * cellSize + cellSize / 2, cellSize * 10.5);
  }
}

function mouseDragged(){
    mx = mouseX - offsetX;
    my = mouseY - offsetY;

    if(dragAnswer != -1){
        mx = mouseX - offsetX;
        my = mouseY - offsetY;
    }
}

function mouseReleased(){
    if(dragAnswer != -1){
        offsetX = (width - boardSize) / 2;
        offsetY = (height - cellSize * 11) / 2;
        
        mx = mouseX - offsetX;
        my = mouseY - offsetY;

        let row = floor(my / cellSize);
        let col = floor(mx / cellSize);

        if(row >= 0 && row < 9 && col >= 0 && col < 9){
            board[row][col] = dragAnswer;
            checkAnswer(row, col);
            
            if(!gameOver && checkWin()){
                gameWin = true;
                noLoop();
            }
        }
        dragAnswer = -1; 
    }
}

function drawDraggingAnswer(offsetX, offsetY){
    mx = mouseX - offsetX;
    my = mouseY - offsetY;
    
    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(dragAnswer, mx, my);
    noFill();
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(mx, my, cellSize, cellSize);
    pop();
}

function checkAnswer(row, col) {
  let val = board[row][col];

  if (isDuplicate(row, col, val)) {
    wrongCells[row][col] = true;
    wrongCount--;
    if (wrongCount <= 0) {
      gameOver = true;
    }
  } 
  else {
    wrongCells[row][col] = false;
  }
}

function checkWin(){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(board[row][col] == 0 || wrongCells[row][col]){
                return false;
            }
        }
    }
    return true;
}

function resetGame(){
    fillBoard();
    removeNumber(board);
    setFixedNumbers();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            wrongCells[row][col] = false;
        }
    }

    wrongCount = 3;
    gameOver = false;
    gameWin = false;
    dragAnswer = -1;
}

function keyPressed(){
    if (key === 'r' || key === 'R') {
        resetGame();
        loop();
    }
}

function mousePressed(){
    offsetX = (width - boardSize) / 2;
    offsetY = (height - cellSize * 11) / 2;
    let mx = mouseX - offsetX;
    let my = mouseY - offsetY;

    if(my >= cellSize * 10 && my <= cellSize * 11 && mx >= 0 && mx <= boardSize){
        let col = floor(mx / cellSize);
        dragAnswer = col + 1;
    } else if(my >= 0 && my < boardSize && mx >= 0 && mx < boardSize){
        rows = floor(my / cellSize);
        cols = floor(mx / cellSize);
    }
    
    if(mouseX >= loadBtnX && mouseX <= loadBtnX + loadBtnW &&
       mouseY >= loadBtnY && mouseY <= loadBtnY + loadBtnH){
        fileInput.elt.click();
    }

    if(mouseX >= saveBtnX && mouseX <= saveBtnX + saveBtnW &&
       mouseY >= saveBtnY && mouseY <= saveBtnY + saveBtnH){
        saveGame();
    }
}

function highlightSelectedCell(){
    if (rows >= 0 && rows < 9 && cols >= 0 && cols < 9) {
        let row = rows;
        let col = cols;

        fill(255, 255, 0, 100);
        rect(col * cellSize, row * cellSize, cellSize, cellSize);

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === board[row][col] && board[row][col] !== 0) {
                    if (!(i === row && j === col)) {
                        fill(255, 255, 0, 50);
                        square(j * cellSize, i * cellSize, cellSize);
                    }
                }
            }
        }
    }
}

function drawSaveButton(){   
    saveBtnX = width - 650;  
    saveBtnY = height - 189;  

    strokeWeight(2);
    fill(255);
    rect(saveBtnX, saveBtnY, saveBtnW, saveBtnH);
    fill(0, 200, 0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Save", saveBtnX + saveBtnW/2, saveBtnY + saveBtnH/2);

    fill(0);
}

function saveGame(){
    let data = [];
    for (let row = 0; row < 9; row++) {
        data.push(board[row].join(" "));
    }    
    saveStrings(data, "sudoku_save_game.txt"); 
    console.log("Game saved!");
}

function endGame(){
    if(gameOver){
        background(250);
        textSize(80);
        textAlign(CENTER, CENTER);
        fill(255, 0, 0);
        text("GAME OVER!", width / 2, height / 2 - 50);
        textSize(40);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Press R to Reset Game", width / 2, height / 2 + 20)
    }   
    if(gameWin){
        background(250);
        textSize(80);
        textAlign(CENTER, CENTER);
        fill(0, 200, 0);
        text("YOU WIN!", width / 2, height / 2 - 50);
        textSize(40);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Press R to Reset Game", width / 2, height / 2 + 20)
    }
}

function handleFile(file){
    if (file.type === 'text') {
        let lines = file.data.split(/\r?\n/);
        board = [];
        for (let i = 0; i < lines.length; i++) {
            let row = lines[i].trim().split(/\s+/).map(Number);
            board.push(row);
        }
        resetWrongCells();
    }
}

function resetWrongCells(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            wrongCells[row][col] = false;
        }
    }
    gameOver = false;
    gameWin = false;
    wrongCount = 3;
    dragAnswer = -1;
    loop();
}

function drawLoadButton(){
    loadBtnX = width - 755;
    loadBtnY = height - 189;
    
    strokeWeight(2);
    fill(255);
    rect(loadBtnX, loadBtnY, loadBtnW, loadBtnH);
    fill(0, 0, 200);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Load", loadBtnX + loadBtnW/2, loadBtnY + loadBtnH/2);
}

function isDuplicate(thatRow, thatCol, answer){
  for (let j = 0; j < 9; j++) {
    if (j !== thatCol && board[thatRow][j] === answer) {
      return true;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (i !== thatRow && board[i][thatCol] === answer) {
      return true;
    }
  }

  let startRow = Math.floor(thatRow / 3) * 3;
  let startCol = Math.floor(thatCol / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if ((i !== thatRow || j !== thatCol) && board[i][j] === answer) {
        return true;
      }
    }
  }

  return false;
}

function setFixedNumbers(){
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      FixedNumber[row][col] = board[row][col] !== 0;
    }
  }
}
