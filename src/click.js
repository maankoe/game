import {getBaseCanvas} from './canvas.js';


class ClickHandler {
	constructor(box) {
		this._box = box;
		let canvas = getBaseCanvas();
		canvas.addEventListener('click', this.handle.bind(this), false);
	}

	handle(event) {
		console.log(event);
		console.log(this._box);
	}
}

export { ClickHandler };