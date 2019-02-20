'use strict';

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

class GameObject {
	
	static get LEFT() {
		return LEFT;
	}

	static get RIGHT() {
		return RIGHT;
	}

	static get BOTTOM() {
		return BOTTOM;
	}

	static get LEFT() {
		return LEFT;
	}

	constructor(x, y, w, h, speed, direction) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.direction = direction;
	}

	get right() {
		return this.x + this.w;
	}

	get bottom() {
		return this.y + this.h;
	}

	intersectsWith(anotherObj) {
		return rectIntersect(this.x, this.y, this.w, this.h,
			anotherObj.x, anotherObj.y, anotherObj.w, anotherObj.h);
	}

	move() {
		switch (this.direction) {
			case GameObject.TOP: 
				this.y -= this.speed;
				break;
			case GameObject.RIGHT:
				this.x += this.speed;
				break;
			case GameObject.BOTTOM:
				this.y += this.speed;
				break;
			case GameObject.LEFT:
				this.x -= this.speed;
				break;
		}
	}
}