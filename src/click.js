import {getBaseCanvas} from './canvas.js';


class ClickHandler {
	constructor(board) {
		this._board = board;
		let canvas = getBaseCanvas();
		canvas.addEventListener('click', this.handle.bind(this), false);
		this._canvasX = canvas.offsetLeft + canvas.clientLeft,
    	this._canvasY = canvas.offsetTop + canvas.clientTop
	}

	handle(event) {
		console.log(event);
		console.log(this);
		console.log(this._board);
		console.log(this._board.boxSize());
		let x = Math.floor((event.clientX - this._canvasX) / this._board.boxSize());
		let y = Math.floor((event.clientY - this._canvasY) / this._board.boxSize());
		console.log(x, y);
	}
}

export { ClickHandler };