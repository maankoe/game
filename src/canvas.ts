import { mockCall, Call } from './mocking.js';


interface INPPath2D {
    rect(x: number, y: number, w: number, h: number): void
}


class NPPath2D implements INPPath2D{
    public static readonly C_RECT = "RECT";

    public calls: Call[] = [];

    static actual(): INPPath2D {
        return new Path2D() satisfies INPPath2D;
    }

    static mock(): NPPath2D {
        return new NPPath2D();
    }
    
    rect(x: number, y: number, w: number, h: number): void {
        this.calls.push(mockCall(NPPath2D.C_RECT, x, y, w, h))
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
        return new Box(x, y, size, NPPath2D.actual());
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


// interface ICanvas {
//     fillText(text: string, x: number, y: number, maxWidth?: number): void;
//     fill(box: Path2D, fillRule?: CanvasFillRule): void;
//     stroke(path: Path2D): void;
// }


export { Box, NPPath2D };