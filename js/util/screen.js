'use strict';

class Screen {
	constructor(containerId, spriteSrc) {
		this._containerId = containerId;
		this._spriteSrc = spriteSrc;
	}
	
	init(callback) {
		this.canvas = $('<canvas></canvas>')
			.attr('id', 'canvas')
			.attr('width', config.screen.width)
			.attr('height', config.screen.height)
			.get(0);
		$(this.canvas).appendTo($('#' + this._containerId));
		this.width = config.screen.width;
		this.height = config.screen.height;
		this.ctx = this.canvas.getContext('2d');

		this.spriteImage = new Image();

		$(this.spriteImage).on('load', () => {
			this.alienSprite = [
				[new Sprite(this.spriteImage, 22, 0, 16, 16), new Sprite(this.spriteImage, 22, 16, 16, 16)],
				[new Sprite(this.spriteImage, 0, 0, 22, 16), new Sprite(this.spriteImage, 0, 16, 22, 16)],
				[new Sprite(this.spriteImage, 38, 0, 24, 16), new Sprite(this.spriteImage, 38, 16, 24, 16)]
			];

			this.shipSprite = new Sprite(this.spriteImage, 62, 0, 22, 16);

			this.bulletSprite = new Sprite(this.spriteImage, 0, 32, 2, 6);

			callback(); 
		}).attr('src', this._spriteSrc);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	drawGameObject(obj, frameMod2) {
		let sprite;
		
		if (obj instanceof Alien) {
			sprite = this.alienSprite[obj.type][frameMod2];
		} else if (obj instanceof Ship) {
			sprite = this.shipSprite;
		} else if (obj instanceof Bullet) {
			sprite = this.bulletSprite;
		}
		
		this.ctx.drawImage(
			sprite.img,
			sprite.x, sprite.y,
			sprite.w, sprite.h,
			obj.x, obj.y,
			sprite.w, sprite.h);
	}
}