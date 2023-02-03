import { Pen } from './drawing.js';


class Cell {
	constructor(x, y, boxSize, initialChar, pen) {
		this._x = x;
		this._y = y;
		this.boxSize = boxSize;
		this._char = initialChar;
		this._pen = pen;
	}

	static actual(x, y, {boxSize, initialChar, pen}={}) {
		return new Cell(
			x, 
			y, 
			boxSize ?? 25, 
			initialChar ?? '', 
			pen ?? Pen.actual()
		);
	}

	static mock(x, y, {boxSize, initialChar, pen}={}) {
		return new Cell(
			x ?? 5, 
			y ?? 6, 
			boxSize ?? 25, 
			initialChar = '',
			pen ?? Pen.mock()
		);
	}

	boxX() {
		return this._x * this.boxSize;
	}

	boxY() {
		return this._y * this.boxSize;
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
		for (var x = 0; x < this.numRows; x++) {
			this.cells.push([]);
			for (var y = 0; y < this.numColumns; y++) {
				this.cells[x].push(Cell.actual(x, y));
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
		for (var x = 0; x < this.numRows; x++) {
			for (var y = 0; y < this.numColumns; y++) {
				this.cells[x][y].draw();
			}
		}
	}
}


export { Cell, Board };
