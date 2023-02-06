// import { expect } from 'chai';
// import { TextStyle, BoxStyle, Pen } from '../src/drawing.js';


// describe('TextStyle', () => {
//     it('constructor', () => {
//         let fontSize = "fontSize";
//         let fontStyle = "fontStyle";
//         let fillStyle = "fillStyle";
//         let textStyle = TextStyle.mock({fontSize: fontSize, fontStyle: fontStyle, fillStyle: fillStyle});
//         expect(textStyle.context().font).to.satisfy(x => x.startsWith(fontSize) && x.endsWith(fontStyle));
//         expect(textStyle.context().fillStyle).to.equal(fillStyle);
//     });
//     it("setFontSize", () => {
//         let fontSize = "newFontSize"
//         let textStyle = TextStyle.mock();
//         textStyle.setFontSize(fontSize);
//         expect(textStyle.context().font).to.satisfy(x => x.startsWith(fontSize));
//     });
//     it("setFontStyle", () => {
//         let fontStyle = "newFontStyle"
//         let textStyle = TextStyle.mock();
//         textStyle.setFontStyle(fontStyle);
//         expect(textStyle.context().font).to.satisfy(x => x.endsWith(fontStyle));
//     });
//     it("setFillStyle", () => {
//         let fillStyle = "newFillStyle"
//         let textStyle = TextStyle.mock();
//         textStyle.setFillStyle(fillStyle);
//         expect(textStyle.context().fillStyle).to.equal(fillStyle);
//     });
// });


// describe("BoxStyle", () => {
//     it("Construction", () => {
//         let fillStyle = "fillStyle";
//         let borderStyle = "borderStyle";
//         let boxStyle = BoxStyle.mock({fillStyle: fillStyle, borderStyle: borderStyle});
//         expect(boxStyle.context().fillStyle).to.equal(fillStyle);
//         expect(boxStyle.context().strokeStyle).to.equal(borderStyle);
//     });
//     it("setFillStyle", () => {
//         let fillStyle = "newFillStyle";
//         let boxStyle = BoxStyle.mock({fillStyle: "oldFillStyle"});
//         boxStyle.setFillStyle(fillStyle);
//         expect(boxStyle.context().fillStyle).to.equal(fillStyle);
//     });
//     it("setBorderStyle", () => {
//         let borderStyle = "newBorderStyle";
//         let boxStyle = BoxStyle.mock({borderStyle: "oldBorderStyle"});
//         boxStyle.setBorderStyle(borderStyle);
//         expect(boxStyle.context().strokeStyle).to.equal(borderStyle);
//     });
// });


// function call(name, ...args) {
//     return {"name": name, "args": args};
// }


// class ContextWithMemory {
//     static BEGIN = "begin";
//     static CLOSE = "close";
//     static FILL_TEXT = "fillText";
//     static FILL_RECT = "fillRect";
//     static STROKE_RECT = "strokeRect";

//     constructor() {
//         this.calls = [];
//     }

//     beginPath() {
//         this.calls.push(call(ContextWithMemory.BEGIN));
//     }

//     fillText(text, x, y) {
//         this.calls.push(call(ContextWithMemory.FILL_TEXT, text, x, y));
//     }

//     fillRect(x, y, width, height) {
//         this.calls.push(call(ContextWithMemory.FILL_RECT, x, y, width, height));
//     }

//     strokeRect(x, y, width, height) {
//         this.calls.push(call(ContextWithMemory.STROKE_RECT, x, y, width, height));
//     }

//     closePath() {
//         this.calls.push(call(ContextWithMemory.CLOSE));
//     }
// }


// // describe("Pen", () => {
// //   it("drawText", () => {
// //     let context = new ContextWithMemory();
// //     let pen = Pen.mock({
// //         textStyle: TextStyle.mock({context: context})
// //     });
// //     let [text, x, y] = ["text", 1, 2];
// //     pen.drawText(text, x, y);
// //     expect(context.calls).deep.equal([
// //         call(ContextWithMemory.BEGIN), 
// //         call(ContextWithMemory.FILL_TEXT, text, x, y), 
// //         call(ContextWithMemory.CLOSE)
// //     ]);
// //   });
// //   it("drawBox", () => {
// //     let context = new ContextWithMemory();
// //     let pen = Pen.mock({
// //         boxStyle: BoxStyle.mock({context: context})
// //     });
// //     let [x, y, width, height] = [1, 2, 3, 4];
// //     pen.drawBox(x, y, width, height);
// //     expect(context.calls).deep.equal([
// //         call(ContextWithMemory.BEGIN), 
// //         call(ContextWithMemory.FILL_RECT, x, y, width, height), 
// //         call(ContextWithMemory.STROKE_RECT, x, y, width, height), 
// //         call(ContextWithMemory.CLOSE)
// //     ]);
// //   });
// // });