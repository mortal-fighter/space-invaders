'use strict';

class Bullet extends GameObject {
	constructor(x, y, w, h, speed, direction) {
		super(x, y, w, h, speed, direction);
	}

	isOutsideScreen() {
		return (this.bottom < 0 || this.y > config.screen.height);
	}
}