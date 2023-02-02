function getBaseContext() {
	let canvas = document.getElementById("board");
	return canvas.getContext("2d");
}


class Context {
	static actual({base}={}) {
		return base ?? getBaseContext();
	}

	static mock({base}={}) {
		return base ?? {};
	}
}


class TextStyle {
	constructor(fontSize, fontStyle, fillStyle, context) {
		this._fontSize = fontSize;
		this._fontStyle = fontStyle;
		this._fillStyle = fillStyle;
		this._context = context;
	}

	static actual({fontSize, fontStyle, fillStyle, context}={}) {
		return new TextStyle(
			fontSize ?? "25px",
			fontStyle ?? "serif", 
			fillStyle ?? "black", 
			context ?? Context.actual()
		);
	}

	static mock({fontSize, fontStyle, fillStyle, context}={}) {
		return new TextStyle(
			fontSize ?? "25px",
			fontStyle ?? "serif", 
			fillStyle ?? "black", 
			context ?? Context.mock()
		);
	}

	setFontSize(fontSize) {
		this._fontSize = fontSize;
	}

	setFontStyle(fontStyle) {
		this._fontStyle = fontStyle;
	}

	setFillStyle(fillStyle) {
		this._fillStyle = fillStyle;
	}

	context() {
		this._context.fillStyle = this._fillStyle;
		this._context.font = [this._fontSize, this._fontStyle].join(' ');
		return this._context;
	}
}


class BoxStyle {
	constructor(fillStyle, borderStyle, context) {
		this._context = context;
		this._borderStyle =  borderStyle;
		this._fillStyle = fillStyle;
	}

	static actual({fillStyle, borderStyle, context}={}) {
		return new BoxStyle(
			fillStyle ?? "white", 
			borderStyle ?? "green", 
			context ?? Context.actual()
		);
	}

	static mock({fillStyle, borderStyle, context}={}) {
		return new BoxStyle(
			fillStyle ?? "white", 
			borderStyle ?? "green", 
			context ?? Context.mock()
		);	
	}

	setFillStyle(fillStyle) {
		this._fillStyle = fillStyle;
	}

	setBorderStyle(borderStyle) {
		this._borderStyle = borderStyle;
	}

	context() {
		this._context.fillStyle = this._fillStyle;
		this._context.strokeStyle = this._borderStyle;
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

