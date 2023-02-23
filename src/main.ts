import { WPath2D } from "./canvas.js";

let path = WPath2D.actual();
path.rect(50, 50, 500, 500);

let board = document.getElementById("board") as HTMLCanvasElement;
let context = board.getContext("2d");
if (context) {
    context.fill(path as Path2D)
}

export {}