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

function setup(){
    createCanvas(500,500);
    textAlign(CENTER, CENTER);
    textSize(20);
    randomBlank();
    fillBoard();
    removeNumber(board);
    printBoardTest();
    drawBoard();
    drawNumInBoard();
}

function draw(){
  
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

function printBoardTest() {
    for (let row = 0; row < a.length; row++) {
        let rowStr = "";
        for (let col = 0; col < board[row].length; col++) {
            if ((col + 1) % 3 === 0) {
                rowStr += str(board[row][col]) + "  ";
             } else {
                   rowStr += str(board[row][col]) + " ";
             }
        }
        print(rowStr);

        if ((row + 1) % 3 === 0) {
            print("");
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
