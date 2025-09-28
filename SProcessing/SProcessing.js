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
let blank = new Array(4);

let board = new Array(9);
for (let i = 0; i < 9; i++) {
    board[i] = new Array(9).fill(0);
}

let rows;
let cols = - 1;
let dragAnswer = -1;

function setup(){
    createCanvas(cellSize*9, cellSize * 11);
    textAlign(CENTER, CENTER);
    textSize(20);
    wrongCount = 0;
    gameOver = false;
    randomBlank();
    fillBoard();
    removeNumber(board);
    drawBoard();
    drawNumInBoard();
    drawAnswer();
}

function draw() {
    background(250);
    drawBoard();
    drawNumInBoard();
    drawAnswer();
    
    if (dragAnswer != -1) {
        drawDraggingAnswer();
    }
    
    if (gameOver) {
        background(250);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2);
    }
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
    for(let i = 0; i < blank.length; i++){
        blank[i] = int(random(0,9));
    }
}

function fillBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = a[row][col];
        }
    }
}

function removeNumber(board) {
    for (let row = 0; row < board.length; row++) {
        let blank = int(random(2, 6));    
        for (let b = 0; b < blank; b++) {
            let col = int(random(9));      
            while (board[row][col] === 0) {
                col = int(random(9));
            }     
            board[row][col] = 0;
        }
    }
}

function drawNumInBoard(){
    fill(0);
    for(let row = 0; row < board.length; row++){
        for (let col = 0 ; col < board[row].length ; col++){
            if(board[row][col] != 0){
                text(board[row][col], col*cellSize + cellSize/2 , row*cellSize + cellSize/2);
            }
        }
    }
}

function mouseClicked(){
    if(mouseY <= 450){
        rows = floor(mouseY / cellSize);
        cols = floor(mouseX / cellSize);
    }
    print("(" + rows + ", " + cols + ")");
}

function drawAnswer() {
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
    if(mouseY >= cellSize * 10 && mouseY <= cellSize * 11 && mouseX >= 0 && mouseX <= cellSize * 9){
        let col = floor(mouseX / cellSize);
        dragAnswer = col + 1;
}

}

function mouseReleased(){
    if(dragAnswer != -1){
        let row = floor(mouseY / cellSize);
        let col = floor(mouseX / cellSize);
        
        if(row >= 0 && row < 9 && col >= 0 && col < 9 && board[row][col] == 0){
            board[row][col] = dragAnswer;
            checkAnswer(row, col);
        }
        dragAnswer = -1; 
    }
}

function drawDraggingAnswer(){
    push();
    
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(dragAnswer, mouseX, mouseY);

    noFill();
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(mouseX, mouseY, 50, 50);
    
    pop();
}

function checkAnswer(row, col){
    if(board[row][col] != 0 && board[row][col] != a[row][col]){
        wrongCount++;
        if (wrongCount == 3) {
            gameOver = true;
        }
    }
}
