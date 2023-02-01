import { Pen } from './drawing.js';


class Cell {
	constructor(pen, x, y, boxSize) {
		this.x = x;
		this.y = y;
		this.boxSize = boxSize;
		this._pen = pen;
	}

	static actual({pen, x, y, boxSize}={}) {
		return new Cell(pen ?? Pen.actual(), x, y, boxSize);
	}

	static mock({pen, x, y, boxSize}={}) {
		return new Cell(pen ?? Pen.mock(), x, y, boxSize);
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
		this._pen.drawText("y", this.textX(), this.textY());
	}
}


class Board {
	constructor(pen, num_rows, num_columns, boxSize) {
		this.num_rows = num_rows;
		this.num_columns = num_columns;
		this.boxSize = boxSize;
		this.cells = []
		for (var i = 0; i < this.num_rows; i++) {
			this.cells.push([]);
			for (var j = 0; j < this.num_columns; j++) {
				this.cells[i].push(new Cell(pen, i, j, boxSize));
			}
		}
	}

	static mock({pen, num_rows, num_columns, boxSize}={}) {
		return new Board(pen ?? Pen.mock(), num_rows, num_columns, boxSize);
	}

	draw() {
		for (var i = 0; i < this.num_rows; i++) {
			for (var j = 0; j < this.num_columns; j++) {
				this.cells[i][j].draw()
			}
		}
	}
}


export { Board };
