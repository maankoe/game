function getBaseCanvas() {
	return document.getElementById("board");
}

function getBaseContext() {
	return getBaseCanvas().getContext("2d");
}

class Box {
	constructor(x, y, size) {
		this._x = x;
		this._y = y;
		this._size = size;
		this._path = new Path2D();
		this._path.rect(this._x, this._y, this._size, this._size);
	}

	static actual(x, y, size) {
		return new Box(x, y, size);
	}

	static mock(x, y, size) {
		return new Box(x, y, size);
	}

	textX() {
		return this._x + this._size / 3;
	}

	textY() {
		return this._y + this._size / 1.5;
	}

	path() {
		return this._path;
	}
}

export { getBaseContext, Box };