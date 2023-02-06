import { expect } from 'chai';
import { mockCall } from '../src/mocking.js';
import { MockContext, MockPath2D } from '../src/canvas.js';


describe('MockContext', () => {
    it('fillText', () => {
        context = new MockContext();
        let text = 'text';
        let x = 5;
        let y = 10;
        context.fillText(text, x, y);
        expect(context.calls).deep.equal([
            mockCall(MockContext.FILL_TEXT, text, x, y)
        ]);
    });
    it('fill', () => {
        context = new MockContext();
        let path = new MockPath2D();
        context.fill(path);
        expect(context.calls).deep.equal([
            mockCall(MockContext.FILL, path)
        ]);
    });
    it('stroke', () => {
        context = new MockContext();
        let path = new MockPath2D();
        context.stroke(path);
        expect(context.calls).deep.equal([
            mockCall(MockContext.STROKE, path)
        ]);
    });
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