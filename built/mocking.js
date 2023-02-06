"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCall = void 0;
function mockCall(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return { "name": name, "args": args };
}
exports.mockCall = mockCall;
