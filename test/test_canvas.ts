import { expect } from 'chai';
import { mockCall } from '../src/mocking';
import {
    CanvasContext, 
    MockCanvasContext 
} from '../src/canvas';


describe('MockCanvasContext', () => {
    it('fillText', () => {
        let context: MockCanvasContext = CanvasContext.mock();
        let text = 'text';
        let x = 5;
        let y = 10;
        let maxWidth = 15;
        context.fillText(text, x, y);
        expect(context.calls).deep.equal([
            mockCall(MockCanvasContext.FILL_TEXT, text, x, y, maxWidth)
        ]);
    });
    // it('fill', () => {
    //     context = new MockCanvasContext();
    //     let path = new MockPath2D();
    //     context.fill(path);
    //     expect(context.calls).deep.equal([
    //         mockCall(MockContext.FILL, path)
    //     ]);
    // });
    // it('stroke', () => {
    //     context = new MockCanvasContext();
    //     let path = new MockPath2D();
    //     context.stroke(path);
    //     expect(context.calls).deep.equal([
    //         mockCall(MockContext.STROKE, path)
    //     ]);
    // });
});


// describe('Box', () => {
//     it('constructor', () => {
//         let x = 5;
//         let y = 10;
//         let size = 15;
//         let box = Box.mock({ x: x, y: y, size: size });
//         box.drawText("text", Context.mock());
//         expect(textStyle.context().font).to.satisfy(x => x.startsWith(fontSize) && x.endsWith(fontStyle));
//         expect(textStyle.context().fillStyle).to.equal(fillStyle);
//     });
// });