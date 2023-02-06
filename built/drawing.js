"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pen = exports.BoxStyle = exports.TextStyle = exports.getBaseContext = void 0;
var canvas_js_1 = require("./canvas.js");
Object.defineProperty(exports, "getBaseContext", { enumerable: true, get: function () { return canvas_js_1.getBaseContext; } });
var Context = /** @class */ (function () {
    function Context() {
    }
    Context.actual = function (_a) {
        var _b = _a === void 0 ? {} : _a, base = _b.base;
        return base !== null && base !== void 0 ? base : (0, canvas_js_1.getBaseContext)();
    };
    Context.mock = function (_a) {
        var _b = _a === void 0 ? {} : _a, base = _b.base;
        return base !== null && base !== void 0 ? base : {};
    };
    return Context;
}());
var TextStyle = /** @class */ (function () {
    function TextStyle(fontSize, fontStyle, fillStyle, context) {
        this._fontSize = fontSize;
        this._fontStyle = fontStyle;
        this._fillStyle = fillStyle;
        this._context = context;
    }
    TextStyle.actual = function (_a) {
        var _b = _a === void 0 ? {} : _a, fontSize = _b.fontSize, fontStyle = _b.fontStyle, fillStyle = _b.fillStyle, context = _b.context;
        return new TextStyle(fontSize !== null && fontSize !== void 0 ? fontSize : "25px", fontStyle !== null && fontStyle !== void 0 ? fontStyle : "serif", fillStyle !== null && fillStyle !== void 0 ? fillStyle : "black", context !== null && context !== void 0 ? context : Context.actual());
    };
    TextStyle.mock = function (_a) {
        var _b = _a === void 0 ? {} : _a, fontSize = _b.fontSize, fontStyle = _b.fontStyle, fillStyle = _b.fillStyle, context = _b.context;
        return new TextStyle(fontSize !== null && fontSize !== void 0 ? fontSize : "25px", fontStyle !== null && fontStyle !== void 0 ? fontStyle : "serif", fillStyle !== null && fillStyle !== void 0 ? fillStyle : "black", context !== null && context !== void 0 ? context : Context.mock());
    };
    TextStyle.prototype.setFontSize = function (fontSize) {
        this._fontSize = fontSize;
    };
    TextStyle.prototype.setFontStyle = function (fontStyle) {
        this._fontStyle = fontStyle;
    };
    TextStyle.prototype.setFillStyle = function (fillStyle) {
        this._fillStyle = fillStyle;
    };
    TextStyle.prototype.context = function () {
        this._context.fillStyle = this._fillStyle;
        this._context.font = [this._fontSize, this._fontStyle].join(' ');
        return this._context;
    };
    return TextStyle;
}());
exports.TextStyle = TextStyle;
var BoxStyle = /** @class */ (function () {
    function BoxStyle(fillStyle, borderStyle, context) {
        this._context = context;
        this._borderStyle = borderStyle;
        this._fillStyle = fillStyle;
    }
    BoxStyle.actual = function (_a) {
        var _b = _a === void 0 ? {} : _a, fillStyle = _b.fillStyle, borderStyle = _b.borderStyle, context = _b.context;
        return new BoxStyle(fillStyle !== null && fillStyle !== void 0 ? fillStyle : "red", borderStyle !== null && borderStyle !== void 0 ? borderStyle : "green", context !== null && context !== void 0 ? context : Context.actual());
    };
    BoxStyle.mock = function (_a) {
        var _b = _a === void 0 ? {} : _a, fillStyle = _b.fillStyle, borderStyle = _b.borderStyle, context = _b.context;
        return new BoxStyle(fillStyle !== null && fillStyle !== void 0 ? fillStyle : "white", borderStyle !== null && borderStyle !== void 0 ? borderStyle : "green", context !== null && context !== void 0 ? context : Context.mock());
    };
    BoxStyle.prototype.setFillStyle = function (fillStyle) {
        this._fillStyle = fillStyle;
    };
    BoxStyle.prototype.setBorderStyle = function (borderStyle) {
        this._borderStyle = borderStyle;
    };
    BoxStyle.prototype.context = function () {
        this._context.fillStyle = this._fillStyle;
        this._context.strokeStyle = this._borderStyle;
        return this._context;
    };
    return BoxStyle;
}());
exports.BoxStyle = BoxStyle;
var Pen = /** @class */ (function () {
    function Pen(textStyle, boxStyle) {
        this._textStyle = textStyle;
        this._boxStyle = boxStyle;
    }
    Pen.actual = function (_a) {
        var _b = _a === void 0 ? {} : _a, textStyle = _b.textStyle, boxStyle = _b.boxStyle;
        return new Pen(textStyle !== null && textStyle !== void 0 ? textStyle : TextStyle.actual(), boxStyle !== null && boxStyle !== void 0 ? boxStyle : BoxStyle.actual());
    };
    Pen.mock = function (_a) {
        var _b = _a === void 0 ? {} : _a, textStyle = _b.textStyle, boxStyle = _b.boxStyle;
        return new Pen(textStyle !== null && textStyle !== void 0 ? textStyle : TextStyle.mock(), boxStyle !== null && boxStyle !== void 0 ? boxStyle : BoxStyle.mock());
    };
    Pen.prototype.drawText = function (text, box) {
        var context = this._textStyle.context();
        context.fillText(text, box.textX(), box.textY());
    };
    Pen.prototype.drawBox = function (box) {
        var context = this._boxStyle.context();
        context.fill(box.path());
        context.stroke(box.path());
    };
    return Pen;
}());
exports.Pen = Pen;
