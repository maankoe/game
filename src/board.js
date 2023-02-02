import { Pen } from './drawing.js';


class Cell {
	constructor(x, y, boxSize, initialChar, pen) {
		this.x = x;
		this.y = y;
		this.boxSize = boxSize;
		this._char = initialChar;
		this._pen = pen;
	}

	static actual({x, y, boxSize, initialChar, pen}={}) {
		return new Cell(x, y, boxSize ?? 25, initialChar ?? 'x', pen ?? Pen.actual());
	}

	static mock({x, y, boxSize, initialChar, pen}={}) {
		return new Cell(
			x ?? 5, 
			y ?? 5, 
			boxSize ?? 25, 
			initialChar = '',
			pen ?? Pen.mock()
		);
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
		this._pen.drawText(this._char, this.textX(), this.textY());
	}
}


class Board {
	constructor(numRows, numColumns, boxSize, pen) {
		this.numRows = numRows;
		this.numColumns = numColumns;
		this.boxSize = boxSize;
		this.cells = [];
		for (var i = 0; i < this.numRows; i++) {
			this.cells.push([]);
			for (var j = 0; j < this.numColumns; j++) {
				this.cells[i].push(Cell.actual({i: i, j: j}));
			}
		}
	}

	static actual({numRows, numColumns, boxSize, pen}={}) {
		return new Board(
			numRows ?? 10,
			numColumns ?? 10, 
			boxSize ?? 25,
			pen ?? Pen.actual()
		);
	}

	static mock({numRows, numColumns, boxSize, pen}={}) {
		return new Board(
			numRows ?? 10,
			numColumns ?? 10, 
			boxSize ?? 25,
			pen ?? Pen.mock()
		);
	}

	draw() {
		for (var i = 0; i < this.numRows; i++) {
			for (var j = 0; j < this.numColumns; j++) {
				this.cells[i][j].draw();
			}
		}
	}
}


export { Board };
