import { mockCall, Call } from './mocking';


interface INPPath2D {
    rect(x: number, y: number, w: number, h: number): void
}


class NPPath2D implements INPPath2D{
    public calls: Call[] = []

    static actual() {
        return new Path2D();
    }

    static mock() {
        return new NPPath2D();
    }
    
    rect(x: number, y: number, w: number, h: number): void {
        this.calls.push(mockCall("rect", x, y, w, h))
    };
}


class Box {
    private path2d: INPPath2D;

    private constructor(
        x: number, y: number, size: number, path2d: INPPath2D
    ) {
        this.path2d = path2d;
        this.path2d.rect(x, y, size, size);
    }

    static actual(x: number, y: number, size: number): Box  {
        return new Box(x, y, size, NPPath2D.actual() satisfies INPPath2D);
    }

    static mock(
        x?: number, y?: number, size?: number, path2d?: INPPath2D
    ): Box {
        return new Box(
            x ?? 3,
            y ?? 7,
            size ?? 11,
            path2d ?? NPPath2D.mock()
        );
    }
}


// class MockPath2D implements Path2D {
//     addPath(path: Path2D, transform?: DOMMatrix2DInit | undefined): void {}
//     arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {}
//     arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {}
//     bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {}
//     closePath(): void {}
//     ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {}
//     lineTo(x: number, y: number): void {}
//     moveTo(x: number, y: number): void {}
//     quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {}
//     rect(x: number, y: number, w: number, h: number): void {}
//     roundRect(x: number, y: number, w: number, h: number, radii?: number | DOMPointInit | (number | DOMPointInit)[] | undefined): void;
//     roundRect(x: number, y: number, w: number, h: number, radii?: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined): void;
//     roundRect(x: unknown, y: unknown, w: unknown, h: unknown, radii?: unknown): void {}
// }


// interface ICanvas {
//     fillText(text: string, x: number, y: number, maxWidth?: number): void;
//     fill(box: Path2D, fillRule?: CanvasFillRule): void;
//     stroke(path: Path2D): void;
// }


export { Box, NPPath2D };