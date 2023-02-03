import { Box } from './canvas.js';
import { Pen } from './drawing.js';


class Cell {
	constructor(initialChar, box, pen) {
		this._char = initialChar;
		this._box = box;
		this._pen = pen;
	}

	static actual(x, y, {boxSize, initialChar, pen}={}) {
		boxSize = boxSize ?? 50;
		return new Cell(
			initialChar ?? 'Z', 
			Box.actual(
				x * boxSize,
				y * boxSize, 
				boxSize
			),
			pen ?? Pen.actual()
		);
	}

	static mock(x, y, {boxSize, initialChar, pen}={}) {
		boxSize = boxSize ?? 50;
		x = x ?? 5;
		y = y ?? 6;
		return new Cell(
			initialChar ?? 'Z', 
			Box.actual(
				x * boxSize,
				y * boxSize, 
				boxSize
			),
			pen ?? Pen.actual()
		);
	}

	box() {
		return this._box;
	}

	draw() {
		this._pen.drawBox(this.box());
		this._pen.drawText(this._char, this.box());
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
