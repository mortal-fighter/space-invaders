'use strict';

class Input {
	constructor() {
		this.down = {};
		this.pressed = {};
		
		$(document).on("keydown", (e) => {
			this.down[e.which] = true;
		});
		$(document).on("keyup", (e) => {
			delete this.down[e.which];
			delete this.pressed[e.which];
		})

		if (isMobile) {
			$('.buttons *').on("vmousedown", (e) => {
				this.down[$(e.target).attr('keyCode')] = true;
			});
			$('.buttons *').on("vmouseup", (e) => {
				delete this.down[$(e.target).attr('keyCode')];
				delete this.pressed[$(e.target).attr('keyCode')];
			})
		}
	}

	keyDown(keyCode) {
		if (this.down[keyCode]) {
			return true;
		} else {
			return false;
		}
	}

	keyPressed(keyCode) {
		if (this.pressed[keyCode]) {
			return false;
		} else if (this.down[keyCode]) {
			return this.pressed[keyCode] = true;
		}
		return false;
	}
}