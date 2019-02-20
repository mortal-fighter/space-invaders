'use strict';

class Alien extends GameObject {
	constructor(x, y, w, h, speed, direction, type) {
		super(x, y, w, h, speed, direction);
		this.type = type;
	}

	stepDown() {
		let direction = this.direction;
		
		this.direction = GameObject.BOTTOM;
		this.move();
		
		this.direction = direction;
	}

	switchDirectionHorizontally() {
		switch (this.direction) {
			case GameObject.RIGHT: 
				this.direction = GameObject.LEFT;
				break;
			case GameObject.LEFT: 
				this.direction = GameObject.RIGHT;
				break;
		}
	}
}