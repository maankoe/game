import { mockCall, Call } from './mocking.js';


function getBaseCanvas(): HTMLCanvasElement {
	return document.getElementById("board") as HTMLCanvasElement;
}


function getBaseContext(): CanvasRenderingContext2D {
	return getBaseCanvas().getContext("2d");
}


interface CanvasRenderingContext2DFacade {
	fillText(text, x, y, maxWidth?: number);
	fill(path: Path2D, fillRule?: CanvasFillRule): void;
	stroke(path: Path2D): void;
}


class CanvasContext implements CanvasRenderingContext2DFacade {
	context: CanvasRenderingContext2D

	private constructor(canvas: CanvasRenderingContext2D) {
		this.context = canvas;
	}

	static actual(
		baseContext?: CanvasRenderingContext2D
	): CanvasContext {
		return new CanvasContext(baseContext ?? getBaseContext());
	}

	static mock(): MockCanvasContext {
		return new MockCanvasContext();
	}

	fillText(text: string, x: number, y: number, maxWidth?: number): void {
		this.context.fillText(text, x, y);
	}

	fill(path: Path2D, fillRule?: CanvasFillRule): void {
		this.context.fill(path, fillRule);
	}

	stroke(path: Path2D): void {
		this.context.stroke(path);
	}
}


class MockCanvasContext implements CanvasRenderingContext2DFacade {
	static BEGIN: string = "begin";
	static CLOSE: string = "close";
	static FILL_TEXT: string = "fillText";
	static FILL: string = "fill";
	static STROKE: string = "STROKE";

	calls: Call[];

	constructor() {
		this.calls = []
	}

	fillText(text: string, x: number, y: number, maxWidth?: number): void {
		this.calls.push(mockCall(MockCanvasContext.FILL_TEXT, text, x, y, maxWidth));
	}

	fill(path: Path2D, fillRule?: CanvasFillRule): void {
		this.calls.push(mockCall(MockCanvasContext.FILL, path, fillRule));
	}

	stroke(path: Path2D): void {
		this.calls.push(mockCall(MockCanvasContext.STROKE, path));
	}
}


export { CanvasContext, CanvasRenderingContext2DFacade, MockCanvasContext };
