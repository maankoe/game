class TextStyle {
	constructor(context, fillStyle, font) {
		this._context = context;
		this._fillStyle = fillStyle;
		this._font = font;
	}

	setFillStyle(fillStyle) {
		this._fillStyle = fillStyle;
	}

	setFont(font) {
		this._font = font;
	}

	context() {
		this._context.fillStyle = this._fillStyle;
		this._context.font = this._font;
		return this._context;
	}
}


class BoxStyle {
	constructor(context, borderStyle, fillStyle) {
		this._context = context;
		this._fillStyle = fillStyle;
		this._strokeStyle =  borderStyle;
	}

	setFillStyle(fillStyle) {
		this._fillStyle = fillStyle;
	}

	setStrokeStyle(strokeStyle) {
		this._strokeStyle = strokeStyle;
	}

	context() {
		this._context.fillStyle = this._fillStyle;
		this._context.strokeStyle = this._strokeStyle
		return this._context;
	}
}


class Pen {
	constructor(textStyle, boxStyle) {
		this._textStyle = textStyle;
		this._boxStyle = boxStyle;
	}

	drawText(text, x, y) {
		let context = this._textStyle.context();
		context.beginPath();
		context.fillText(text, x, y);
		context.closePath();
	}

	drawRect(x, y, width, height) {
		let context = this._boxStyle.context();
		context.beginPath();
		context.fillRect(x, y, width, height);
		context.strokeRect(x, y, width, height);
		context.closePath();
	}
}


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
		this._pen.drawRect(this.boxX(), this.boxY(), this.boxSize, this.boxSize);
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


const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let textStyle = new TextStyle(context, "black", "25px serif");
let boxStyle = new BoxStyle(context, "white", "green");
let board = new Board(6, 6, 40, textStyle, boxStyle);
board.draw(context);






