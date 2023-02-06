"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.Cell = void 0;
var canvas_js_1 = require("./canvas.js");
var drawing_js_1 = require("./drawing.js");
var click_js_1 = require("./click.js");
var Cell = /** @class */ (function () {
    function Cell(initialChar, box, pen) {
        this._char = initialChar;
        this._box = box;
        this._pen = pen;
    }
    Cell.actual = function (x, y, _a) {
        var _b = _a === void 0 ? {} : _a, boxSize = _b.boxSize, initialChar = _b.initialChar, pen = _b.pen;
        boxSize = boxSize !== null && boxSize !== void 0 ? boxSize : 50;
        return new Cell(initialChar !== null && initialChar !== void 0 ? initialChar : 'Z', canvas_js_1.Box.actual(x * boxSize, y * boxSize, boxSize), pen !== null && pen !== void 0 ? pen : drawing_js_1.Pen.actual());
    };
    Cell.mock = function (x, y, _a) {
        var _b = _a === void 0 ? {} : _a, boxSize = _b.boxSize, initialChar = _b.initialChar, pen = _b.pen;
        boxSize = boxSize !== null && boxSize !== void 0 ? boxSize : 50;
        x = x !== null && x !== void 0 ? x : 5;
        y = y !== null && y !== void 0 ? y : 6;
        return new Cell(initialChar !== null && initialChar !== void 0 ? initialChar : 'Z', canvas_js_1.Box.actual(x * boxSize, y * boxSize, boxSize), pen !== null && pen !== void 0 ? pen : drawing_js_1.Pen.actual());
    };
    Cell.prototype.box = function () {
        return this._box;
    };
    Cell.prototype.draw = function () {
        this._pen.drawBox(this.box());
        this._pen.drawText(this._char, this.box());
    };
    return Cell;
}());
exports.Cell = Cell;
var Board = /** @class */ (function () {
    function Board(numRows, numColumns, boxSize, pen) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this._boxSize = boxSize;
        this.cells = [];
        for (var x = 0; x < this.numRows; x++) {
            this.cells.push([]);
            for (var y = 0; y < this.numColumns; y++) {
                var cell = Cell.actual(x, y, { boxSize: boxSize });
                this.cells[x].push(cell);
            }
        }
        var clickHandler = new click_js_1.ClickHandler(this);
    }
    Board.actual = function (_a) {
        var _b = _a === void 0 ? {} : _a, numRows = _b.numRows, numColumns = _b.numColumns, boxSize = _b.boxSize, pen = _b.pen;
        return new Board(numRows !== null && numRows !== void 0 ? numRows : 10, numColumns !== null && numColumns !== void 0 ? numColumns : 10, boxSize !== null && boxSize !== void 0 ? boxSize : 50, pen !== null && pen !== void 0 ? pen : drawing_js_1.Pen.actual());
    };
    Board.mock = function (_a) {
        var _b = _a === void 0 ? {} : _a, numRows = _b.numRows, numColumns = _b.numColumns, boxSize = _b.boxSize, pen = _b.pen;
        return new Board(numRows !== null && numRows !== void 0 ? numRows : 10, numColumns !== null && numColumns !== void 0 ? numColumns : 10, boxSize !== null && boxSize !== void 0 ? boxSize : 25, pen !== null && pen !== void 0 ? pen : drawing_js_1.Pen.mock());
    };
    Board.prototype.boxSize = function () {
        return this._boxSize;
    };
    Board.prototype.draw = function () {
        for (var x = 0; x < this.numRows; x++) {
            for (var y = 0; y < this.numColumns; y++) {
                this.cells[x][y].draw();
            }
        }
    };
    return Board;
}());
exports.Board = Board;
