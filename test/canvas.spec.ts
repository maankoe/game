import { expect } from "chai";
import { mockCall, mockCalls } from "../src/mocking.js";
import { WPath2D, WCanvasContext } from "../src/canvas.js";

describe("WPathMock", () => {
    it("Records call to rect(..)", () => {
        let x = 5;
        let y = 10;
        let width = 15;
        let height = 17;
        let path2d = WPath2D.mock();
        path2d.rect(x, y, width, height);
        expect(path2d.calls).deep.equal(mockCalls(
            mockCall(WPath2D.C_RECT, x, y, width, height)
        ));
    });
});

describe("WCanvasMock", () => {
    it("Records call to fillText(..)", () => {
        let text = "text";
        let x = 5;
        let y = 7;
        let maxWidth = 2;
        let canvas = WCanvasContext.mock();
        canvas.fillText(text, x, y, maxWidth);
        expect(canvas.calls).deep.equal(mockCalls(
            mockCall(WCanvasContext.C_FILL_TEXT, text, x, y, maxWidth)
        ));
    });
    it("Records call to fill(..)", () => {
        let path = WPath2D.mock();
        let fillRule = undefined; // TODO: work out how to set/mock this
        let canvas = WCanvasContext.mock();
        canvas.fill(path, fillRule);
        expect(canvas.calls).deep.equal(mockCalls(
            mockCall(WCanvasContext.C_FILL, path, fillRule)
        ));
    });
    it("Records call to stroke(..)", () => {   
        let path = WPath2D.mock();
        let canvas = WCanvasContext.mock();
        canvas.stroke(path);
        expect(canvas.calls).deep.equal(mockCalls(
            mockCall(WCanvasContext.C_STROKE, path)
        ));
    });
});

// describe("Box", () => {
//     it("Constructor", () => {
//         let x = 5;
//         let y = 10;
//         let size = 15;
//         let box = new Box(x)
//         expect(box.x).to.equal(x);
//         // Box.actual(x, y, size);
//         // expect(mockCanvasContext.calls).deep.equals([mockCall(
//         //     MockCanvasContext.FILL_TEXT, text, x, y, maxWidth
//         // )]);
//     });
// });


// // describe("MockCanvasContext", () => {
// //     it("fillText", () => {
// //         let mockCanvasContext = new MockCanvasContext();
// //         let text = "text";
// //         let x = 5;
// //         let y = 10;
// //         let maxWidth = 15;
// //         mockCanvasContext.fillText(text, x, y, maxWidth);
// //         expect(mockCanvasContext.calls).deep.equals([mockCall(
// //             MockCanvasContext.FILL_TEXT, text, x, y, maxWidth
// //         )]);
// //     });

// //     // it("fill", () => {
// //     //     let mockCanvasContext = new MockCanvasContext();
// //     //     let path = new MockPath();
// //     //     let x = 5;
// //     //     let y = 10;
// //     //     let maxWidth = 15;
// //     //     mockCanvasContext.fill(path, maxWidth);
// //     //     expect(mockCanvasContext.calls).deep.equals([mockCall(
// //     //         MockCanvasContext.FILL_TEXT, text, x, y, maxWidth
// //     //     )]);
// //     // });
// // });