"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPath2D = exports.MockContext = exports.Box = exports.getBaseContext = exports.getBaseCanvas = void 0;
var mocking_js_1 = require("./mocking.js");
function getBaseCanvas() {
    return document.getElementById("board");
}
exports.getBaseCanvas = getBaseCanvas;
function getBaseContext() {
    return getBaseCanvas().getContext("2d");
}
exports.getBaseContext = getBaseContext;
var MockContext = /** @class */ (function () {
    function MockContext() {
        this.calls = [];
    }
    MockContext.actual = function () {
        return getBaseContext();
    };
    MockContext.mock = function () {
        return new MockContext();
    };
    MockContext.prototype.fillText = function (text, x, y) {
        this.calls.push((0, mocking_js_1.mockCall)(MockContext.FILL_TEXT, text, x, y));
    };
    MockContext.prototype.fill = function (path) {
        this.calls.push((0, mocking_js_1.mockCall)(MockContext.FILL, path));
    };
    MockContext.prototype.stroke = function (path) {
        this.calls.push((0, mocking_js_1.mockCall)(MockContext.STROKE, path));
    };
    MockContext.BEGIN = "begin";
    MockContext.CLOSE = "close";
    MockContext.FILL_TEXT = "fillText";
    MockContext.FILL = "fill";
    MockContext.STROKE = "STROKE";
    return MockContext;
}());
exports.MockContext = MockContext;
var MockPath2D = /** @class */ (function () {
    function MockPath2D() {
    }
    return MockPath2D;
}());
exports.MockPath2D = MockPath2D;
var Box = /** @class */ (function () {
    function Box(x, y, size, path2d) {
        this._x = x;
        this._y = y;
        this._size = size;
        this._path = path2d;
        this._path.rect(this._x, this._y, this._size, this._size);
    }
    Box.actual = function (x, y, size) {
        return new Box(x, y, size, new Path2D());
    };
    Box.mock = function (x, y, size) {
        return new Box(x, y, size, new MockPath2D());
    };
    Box.prototype._textX = function () {
        return this._x + this._size / 3;
    };
    Box.prototype._textY = function () {
        return this._y + this._size / 1.5;
    };
    Box.prototype.drawText = function (text, context) {
        context.fillText(text, this.textX(), this.textY());
    };
    Box.prototype.drawBox = function (context) {
        context.fill(this._path);
        context.stroke(this._path);
    };
    return Box;
}());
exports.Box = Box;
