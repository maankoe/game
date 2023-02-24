import { Calls } from './mocking.js';


interface IWPath2D {
    rect(x: number, y: number, w: number, h: number): void
}


class WPath2D implements IWPath2D {
    public static readonly C_RECT = "RECT";

    public calls: Calls = new Calls();

    static actual(): IWPath2D {
        return new Path2D() satisfies IWPath2D;
    }

    static mock(): WPath2D {
        return new WPath2D();
    }

    rect(x: number, y: number, w: number, h: number): void {
        this.calls.mock(WPath2D.C_RECT, x, y, w, h)
    };
}


interface IWCanvasContext {
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    stroke(path: Path2D): void;
}


class WCanvasContext implements IWCanvasContext {
    public static readonly C_FILL_TEXT = "FILL_TEXT";
    public static readonly C_FILL = "FILL";
    public static readonly C_STROKE = "STROKE";
    
    public calls: Calls = new Calls();

    static actual(): IWCanvasContext | null {
        let board = document.getElementById("board") as HTMLCanvasElement;
        let context = board.getContext("2d");
        if (context) {
            return context satisfies IWCanvasContext;
        } else {
            throw new ReferenceError("Oh no.");
        }
    }

    static mock(): WCanvasContext {
        return new WCanvasContext();
    }

    fillText(text: string, x: number, y: number, maxWidth?: number): void {
        this.calls.mock(WCanvasContext.C_FILL_TEXT, text, x, y, maxWidth);
    }

    fill(path: IWPath2D, fillRule?: CanvasFillRule): void {
        this.calls.mock(WCanvasContext.C_FILL, path, fillRule);
    }

    stroke(path: IWPath2D): void {
        this.calls.mock(WCanvasContext.C_STROKE, path);
    }
}

// class Box {
//     private path2d: IWPath2D;

//     private constructor(
//         x: number, y: number, size: number, path2d: IWPath2D
//     ) {
//         this.path2d = path2d;
//         this.path2d.rect(x, y, size, size);
//     }

//     static actual(x: number, y: number, size: number): Box {
//         return new Box(x, y, size, WPath2D.actual());
//     }

//     static mock(
//         x?: number, y?: number, size?: number, path2d?: IWPath2D
//     ): Box {
//         return new Box(
//             x ?? 3,
//             y ?? 7,
//             size ?? 11,
//             path2d ?? WPath2D.mock()
//         );
//     }
// }

export { WPath2D, WCanvasContext };