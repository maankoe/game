
class Cell {
	constructor(x, y, boxSize, pen) {
		this.x = x;
		this.y = y;
		this.boxSize = boxSize;
		this._pen = pen;
	}

	boxX() {
		return this.x * this.boxSize;
	}

	boxY() {
		return this.y * this.boxSize;
	}

	textX() {
		return this.boxX() + this.boxSize / 3;
	}

	textY() {
		return this.boxY() + this.boxSize / 1.5;
	}

	draw() {
		this._pen.drawBox(this.boxX(), this.boxY(), this.boxSize, this.boxSize);
		this._pen.drawText("X", this.textX(), this.textY());
	}
}


class Board {
	constructor(width, height, boxSize, textStyle, boxStyle) {
		this.width = width;
		this.height = height;
		this.boxSize = boxSize;
		this.cells = []
		for (var i = 0; i < this.width; i++) {
			this.cells.push([]);
			for (var j = 0; j < this.height; j++) {
				this.cells[i].push(new Cell(i, j, boxSize, new Pen(textStyle, boxStyle)));
			}
		}
	}

	draw(context) {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				this.cells[i][j].draw(context)
			}
		}
	}
}


// const canvas = document.getElementById("board");
// const context = canvas.getContext("2d");

// let textStyle = new TextStyle(context, "black", "25px serif");
// let boxStyle = new BoxStyle(context, "white", "green");
// let board = new Board(6, 6, 40, textStyle, boxStyle);
// board.draw(context);