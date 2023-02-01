import { TextStyle, BoxStyle, Pen } from '../src/drawing.js';
import { expect } from 'chai';


describe('TextStyle', () => {
    it('constructor', () => {
        let fillStyle = "fillStyle";
        let font = "font";
        let textStyle = TextStyle.mock({fillStyle: fillStyle, font: font});
        expect(textStyle.context().fillStyle).to.equal(fillStyle);
        expect(textStyle.context().font).to.equal(font);
    });
    it("setFillStyle", () => {
        let fillStyle = "newFillStyle";
        let font = "font";
        let textStyle = TextStyle.mock({fillStyle: "oldFillStyle", font: font});
        textStyle.setFillStyle(fillStyle);
        expect(textStyle.context().fillStyle).to.equal(fillStyle);
        expect(textStyle.context().font).to.equal(font);
    });
    it("setFont", () => {
        let fillStyle = "fillStyle";
        let font = "newFont";
        let textStyle = TextStyle.mock({fillStyle: fillStyle, font:"oldFont"});
        textStyle.setFont(font);
        expect(textStyle.context().fillStyle).to.equal(fillStyle);
        expect(textStyle.context().font).to.equal(font);
    });
});


describe("BoxStyle", () => {
    it("Construction", () => {
        let fillStyle = "fillStyle";
        let borderStyle = "borderStyle";
        let boxStyle = BoxStyle.mock({fillStyle: fillStyle, borderStyle: borderStyle});
        expect(boxStyle.context().fillStyle).to.equal(fillStyle);
        expect(boxStyle.context().strokeStyle).to.equal(borderStyle);
    });
    it("setFillStyle", () => {
        let fillStyle = "newFillStyle";
        let borderStyle = "borderStyle";
        let boxStyle = BoxStyle.mock({fillStyle: "oldFillStyle",borderStyle: borderStyle});
        boxStyle.setFillStyle(fillStyle);
        expect(boxStyle.context().fillStyle).to.equal(fillStyle);
        expect(boxStyle.context().strokeStyle).to.equal(borderStyle);
    });
    it("setBorderStyle", () => {
        let fillStyle = "fillStyle";
        let borderStyle = "newBorderStyle";
        let boxStyle = BoxStyle.mock({fillStyle: fillStyle, borderStyle: "oldBorderStyle"});
        boxStyle.setBorderStyle(borderStyle);
        expect(boxStyle.context().fillStyle).to.equal(fillStyle);
        expect(boxStyle.context().strokeStyle).to.equal(borderStyle);
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
  it("drawText", () => {
    let context = new ContextWithMemory();
    let pen = Pen.mock({
        textStyle: TextStyle.mock({context: context})
    });
    let [text, x, y] = ["text", 1, 2];
    pen.drawText(text, x, y);
    expect(context.calls).deep.equal([
        call(ContextWithMemory.BEGIN), 
        call(ContextWithMemory.FILL_TEXT, text, x, y), 
        call(ContextWithMemory.CLOSE)
    ]);
  });
  it("drawBox", () => {
    let context = new ContextWithMemory();
    let pen = Pen.mock({
        boxStyle: BoxStyle.mock({context: context})
    });
    let [x, y, width, height] = [1, 2, 3, 4];
    pen.drawBox(x, y, width, height);
    expect(context.calls).deep.equal([
        call(ContextWithMemory.BEGIN), 
        call(ContextWithMemory.FILL_RECT, x, y, width, height), 
        call(ContextWithMemory.STROKE_RECT, x, y, width, height), 
        call(ContextWithMemory.CLOSE)
    ]);
  });
});