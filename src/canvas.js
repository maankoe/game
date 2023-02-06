import { mockCall } from './mocking.js';


function getBaseCanvas() {
	return document.getElementById("board");
}

function getBaseContext() {
	return getBaseCanvas().getContext("2d");
}


class MockContext {
    static BEGIN = "begin";
    static CLOSE = "close";
    static FILL_TEXT = "fillText";
    static FILL = "fill";
    static STROKE = "STROKE";

	constructor() {
		this.calls = []
	}

	static actual() {
		return getBaseContext();
	}

	static mock() {
		return new MockContext();
	}

	fillText(text, x, y) {
        this.calls.push(mockCall(MockContext.FILL_TEXT, text, x, y));
    }

	fill(path) {
        this.calls.push(mockCall(MockContext.FILL, path));
	}

	stroke(path) {
        this.calls.push(mockCall(MockContext.STROKE, path));
	}
}


class MockPath2D {

}


class Box {
	constructor(x, y, size, path2d) {
		this._x = x;
		this._y = y;
		this._size = size;
		this._path = path2d;
		this._path.rect(this._x, this._y, this._size, this._size);
	}

	static actual(x, y, size) {
		return new Box(x, y, size, new Path2D());
	}

	static mock(x, y, size) {
		return new Box(x, y, size, new MockPath2D());
	}

	_textX() {
		return this._x + this._size / 3;
	}

	_textY() {
		return this._y + this._size / 1.5;
	}

	drawText(text, context) {
		context.fillText(text, this.textX(), this.textY());
	}

	drawBox(context) {
		context.fill(this._path);
		context.stroke(this._path);
	}
}

export { getBaseCanvas, getBaseContext, Box, MockContext, MockPath2D };
