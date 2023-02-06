"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = exports.mockCall = void 0;
function mockCall(name, ...args) {
    return new Call(name, args);
}
exports.mockCall = mockCall;
class Call {
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}
exports.Call = Call;
