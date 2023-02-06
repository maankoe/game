"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickHandler = void 0;
var canvas_js_1 = require("./canvas.js");
var ClickHandler = /** @class */ (function () {
    function ClickHandler(board) {
        this._board = board;
        var canvas = (0, canvas_js_1.getBaseCanvas)();
        canvas.addEventListener('click', this.handle.bind(this), false);
        this._canvasX = canvas.offsetLeft + canvas.clientLeft,
            this._canvasY = canvas.offsetTop + canvas.clientTop;
    }
    ClickHandler.prototype.handle = function (event) {
        console.log(event);
        console.log(this);
        console.log(this._board);
        console.log(this._board.boxSize());
        var x = Math.floor((event.clientX - this._canvasX) / this._board.boxSize());
        var y = Math.floor((event.clientY - this._canvasY) / this._board.boxSize());
        console.log(x, y);
    };
    return ClickHandler;
}());
exports.ClickHandler = ClickHandler;
