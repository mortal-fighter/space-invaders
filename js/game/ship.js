'use strict';

class Ship extends GameObject {
	constructor(x, y, w, h, speed, direction) {
		super(x, y, w, h, speed, direction);
	}

	move() {
		super.move();
		this.x = Math.max(Math.min(this.x, config.screen.width - (config.screen.padding + this.w)), config.screen.padding);
	}
}