// const drawing = require('../src/drawing.js');
import {TextStyle, BoxStyle, Pen} from './drawing.js';


describe("TextStyle", () => {
    test("Construction", () => {
        let fillStyle = "fillStyle";
        let font = "font";
        let textStyle = drawing.TextStyle.mock({fillStyle: fillStyle, font: font});
        expect(textStyle.context().fillStyle).toEqual(fillStyle);
        expect(textStyle.context().font).toEqual(font);
    });
    test("setFillStyle", () => {
        let fillStyle = "newFillStyle";
        let font = "font";
        let textStyle = drawing.TextStyle.mock({fillStyle: "oldFillStyle", font: font});
        textStyle.setFillStyle(fillStyle);
        expect(textStyle.context().fillStyle).toEqual(fillStyle);
        expect(textStyle.context().font).toEqual(font);
    });
    test("setFont", () => {
        let fillStyle = "fillStyle";
        let font = "newFont";
        let textStyle = drawing.TextStyle.mock({fillStyle: fillStyle, font:"oldFont"});
        textStyle.setFont(font);
        expect(textStyle.context().fillStyle).toEqual(fillStyle);
        expect(textStyle.context().font).toEqual(font);
    });
});


describe("BoxStyle", () => {
    test("Construction", () => {
        let fillStyle = "fillStyle";
        let borderStyle = "borderStyle";
        let boxStyle = drawing.BoxStyle.mock({fillStyle: fillStyle, borderStyle: borderStyle});
        expect(boxStyle.context().fillStyle).toEqual(fillStyle);
        expect(boxStyle.context().strokeStyle).toEqual(borderStyle);
    });
    test("setFillStyle", () => {
        let fillStyle = "newFillStyle";
        let borderStyle = "borderStyle";
        let boxStyle = drawing.BoxStyle.mock({fillStyle: "oldFillStyle",borderStyle: borderStyle});
        boxStyle.setFillStyle(fillStyle);
        expect(boxStyle.context().fillStyle).toEqual(fillStyle);
        expect(boxStyle.context().strokeStyle).toEqual(borderStyle);
    });
    test("setBorderStyle", () => {
        let fillStyle = "fillStyle";
        let borderStyle = "newBorderStyle";
        let boxStyle = drawing.BoxStyle.mock({fillStyle: fillStyle, borderStyle: "oldBorderStyle"});
        boxStyle.setBorderStyle(borderStyle);
        expect(boxStyle.context().fillStyle).toEqual(fillStyle);
        expect(boxStyle.context().strokeStyle).toEqual(borderStyle);
    });
});


function call(name, ...args) {
    return {"name": name, "args": args}
}


class ContextWithMemory {
    static BEGIN = "begin";
    static CLOSE = "close";
    static FILL_TEXT = "fillText";
    static FILL_RECT = "fillRect";
    static STROKE_RECT = "strokeRect";

    constructor() {
        this.calls = [];
    }

    beginPath() {
        this.calls.push(call(ContextWithMemory.BEGIN))
    }

    fillText(text, x, y) {
        this.calls.push(call(ContextWithMemory.FILL_TEXT, text, x, y))
    }

    fillRect(x, y, width, height) {
        this.calls.push(call(ContextWithMemory.FILL_RECT, x, y, width, height))
    }

    strokeRect(x, y, width, height) {
        this.calls.push(call(ContextWithMemory.STROKE_RECT, x, y, width, height))
    }

    closePath() {
        this.calls.push(call(ContextWithMemory.CLOSE))
    }
}


describe("Pen", () => {
  test("drawText", () => {
    let context = new ContextWithMemory();
    let pen = drawing.Pen.mock({
        textStyle: drawing.TextStyle.mock({context: context})
    });
    let [text, x, y] = ["text", 1, 2];
    pen.drawText(text, x, y);
    expect(context.calls).toEqual([
        call(ContextWithMemory.BEGIN), 
        call(ContextWithMemory.FILL_TEXT, text, x, y), 
        call(ContextWithMemory.CLOSE)
    ]);
  });
  test("drawBox", () => {
    let context = new ContextWithMemory();
    let pen = drawing.Pen.mock({
        boxStyle: drawing.BoxStyle.mock({context: context})
    });
    let [x, y, width, height] = [1, 2, 3, 4];
    pen.drawBox(x, y, width, height);
    expect(context.calls).toEqual([
        call(ContextWithMemory.BEGIN), 
        call(ContextWithMemory.FILL_RECT, x, y, width, height), 
        call(ContextWithMemory.STROKE_RECT, x, y, width, height), 
        call(ContextWithMemory.CLOSE)
    ]);
  });
});

























