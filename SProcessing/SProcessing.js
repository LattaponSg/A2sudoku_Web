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
    printBoardTest();
    drawBoard();
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

function fillBoard(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            board[i][j] = a[i][j];
        }
        for (let k = 0; k < 4; k++) {
            let col = Blank[k];
            Board[i][col] = 0;
        }
    }
}

function printBoardTest() {
  for (let i = 0; i < a.length; i++) {
    let rowStr = "";
    for (let j = 0; j < a[i].length; j++) {
      rowStr += str(board[i][j]) + " ";
    }
    print(rowStr);

    if ((i + 1) % 3 === 0) {
      print("");
    }
  }
}
