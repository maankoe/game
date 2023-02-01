class MockContext {}


class TextStyle {
	constructor(context, fillStyle, font) {
		this._context = context;
		this._fillStyle = fillStyle;
		this._font = font;
	}

	static mock({context, fillStyle, font}={}) {
		return new TextStyle(context ?? new MockContext(), fillStyle, font);
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
	constructor(context, fillStyle, borderStyle) {
		this._context = context;
		this._borderStyle =  borderStyle;
		this._fillStyle = fillStyle;
	}

	static mock({context, fillStyle, borderStyle}={}) {
		return new BoxStyle(context ?? new MockContext(), fillStyle, borderStyle);
	}

	setFillStyle(fillStyle) {
		this._fillStyle = fillStyle;
	}

	setBorderStyle(borderStyle) {
		this._borderStyle = borderStyle;
	}

	context() {
		this._context.fillStyle = this._fillStyle;
		this._context.strokeStyle = this._borderStyle
		return this._context;
	}
}


class Pen {
	constructor(textStyle, boxStyle) {
		this._textStyle = textStyle;
		this._boxStyle = boxStyle;
	}

	static mock({textStyle, boxStyle}={}) {
		return new Pen(
			textStyle ?? TextStyle.mock(), 
			boxStyle ?? BoxStyle.mock()
		);
	}

	drawText(text, x, y) {
		let context = this._textStyle.context();
		context.beginPath();
		context.fillText(text, x, y);
		context.closePath();
	}

	drawBox(x, y, width, height) {
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


export { TextStyle, BoxStyle, Pen };



