class MockContext {}

function getContext() {
	let canvas = document.getElementById("board");
	return context = canvas.getContext("2d");
}

class TextStyle {
	constructor(context, fillStyle, font) {
		this._context = context;
		this._fillStyle = fillStyle;
		this._font = font;
	}

	static actual({context, fillStyle, font}={}) {
		
		return new TextStyle(context ?? getContext(), fillStyle, font);
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

	static actual({textStyle, boxStyle}={}) {
		return new Pen(
			textStyle ?? TextStyle.actual(), 
			boxStyle ?? BoxStyle.actual()
		);
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


export { TextStyle, BoxStyle, Pen };



