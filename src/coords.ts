class Coordinate {
    
}


class Box {
    private x: number;
    private y: number;
    private size: number;
    private path: CanvasPath;

	private constructor(x: number, y: number, size: number, path2d: CanvasPath) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.path = path2d;
		this.path.rect(this.x, this.y, this.size, this.size);
	}

	static actual(x, y, size) {
		return new Box(x, y, size, new Path2D());
	}

	static mock(x, y, size) {
		return new Box(x, y, size, new Path2D());
	}

	public textX() {
		return this.x + this.size / 3;
	}

	public textY() {
		return this.y + this.size / 1.5;
	}

    public boxX() {
        return this.x;
    }

    public boxY() {
        return this.y;
    }

	// drawText(text, context) {
	// 	context.fillText(text, this.textX(), this.textY());
	// }

	// drawBox(context) {
	// 	context.fill(this._path);
	// 	context.stroke(this._path);
	// }
}