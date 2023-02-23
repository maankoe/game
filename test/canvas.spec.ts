import { expect } from "chai";
import { mockCall } from "../src/mocking.js";
import { Box, NPPath2D } from "../src/canvas.js";

describe("Test", () => {
    it("should work", () => {
        let x = 5;
        let y = 10;
        let size = 15;
        let path2d = NPPath2D.mock();
        let box = Box.mock(x, y, size, path2d);
        expect(path2d.calls).deep.equal([
            mockCall(NPPath2D.C_RECT, x, y, size, size)
        ])
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