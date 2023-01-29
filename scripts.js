function Board(width, height, boxSize) {
  this.width = width;
  this.height = height;
  this.boxSize = boxSize;
  this.chartBoard = [];

  for (var i = 0; i < this.width; i++) {
    const row = [];
    this.chartBoard.push(row);
    for (var j = 0; j < this.height; j++) {
      const col = {};
      row.push(col);
    }
  }
}

Board.prototype.drawBoard = function() {
  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.strokeRect(j * this.boxSize, i * this.boxSize, this.boxSize, this.boxSize);
      ctx.font = (this.boxSize/2)+"px serif";
      ctx.fillText("X", j*this.boxSize+this.boxSize/3, i*this.boxSize+this.boxSize/1.5);
      ctx.closePath();
    }
  }
};

let board = new Board(6, 6, 40);

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

board.drawBoard();