'use strict';

class App {
	constructor(isMobile) {
		this.isMobile = isMobile;
	}

	init(callback) {
		this.screen = new Screen(
			config.container.id,
			config.sprite.src
		);
		
		this.screen.init(() => {
			this.sound = new Sound(!this.isMobile && config.audio.enable);
			this.input = new Input();
			this.frame = 1;
			this.frameMod2 = 0;
			this.bullets = [];
			
			let x = (this.screen.width - this.screen.shipSprite.w) / 2;
			let y = this.screen.height - (config.screen.padding + this.screen.shipSprite.h);
			let w = this.screen.shipSprite.w;
			let h = this.screen.shipSprite.h;
			this.ship = new Ship(x, y, w, h, config.ship.speed, GameObject.RIGHT);
				
			this.aliens = [];
			for (let i = 0; i < config.game.alienInRow; i++) {
				for (let j = 0; j < config.game.alienInCol; j++) {
					let alienType = config.game.alienTypesInRow[j];
					let x = config.screen.padding + i * config.alien.padding + config.game.alienRowsExtraSpace[alienType];
					let y = config.screen.padding + j * config.alien.padding;
					let w = this.screen.alienSprite[alienType][0].w;
					let h = this.screen.alienSprite[alienType][0].h;
					
					if (!this.aliens[i]) {
						this.aliens[i] = [];
					}
					this.aliens[i].push(new Alien(x, y, w, h, config.alien.speed, GameObject.RIGHT, alienType));
				}
			}

			callback();
		});
	}

	run() {
		this.sound.theme(); 
		
		this._loop = () => {
			this._update();
			this._render();
			window.requestAnimationFrame(this._loop, this.screen.canvas);
		};
		window.requestAnimationFrame(this._loop, this.screen.canvas);
	}

	toggleSound() {
		if (!this.sound.isEnabled) {
			this.sound.enable();
			this.sound.theme();
		} else {
			this.sound.pauseAll();
			this.sound.disable();
		}
	}

	_update() {
		// Ship
		if (this.input.keyDown(37)) { // arrow left
			this.ship.direction = GameObject.LEFT;
			this.ship.move();
		}
		if (this.input.keyDown(39)) { // arrow right
			this.ship.direction = GameObject.RIGHT;
			this.ship.move();
		}
		if (this.input.keyPressed(32)) { // space button
			let x = this.ship.x + config.bullet.ship.offsetX;
			let y = this.ship.y;
			let w = this.screen.bulletSprite.w;
			let h = this.screen.bulletSprite.h;
			this.bullets.push(new Bullet(x, y, w, h, config.bullet.ship.speed, GameObject.TOP));
			this.sound.shoot();
		}

		// Bullets
		for (let iBullet = 0, lenBullets = this.bullets.length; iBullet < lenBullets; iBullet++) {
			let b = this.bullets[iBullet];
			b.move();

			if (b.isOutsideScreen()) {
				this.bullets.splice(iBullet, 1);
				lenBullets--;
				iBullet--;
				continue;
			}

			// Does a bullet hits someone?
			for (let i = 0, lenI = this.aliens.length; i < lenI; i++) {
				for (let j = 0, lenJ = this.aliens[i].length; j < lenJ; j++) {
					let a = this.aliens[i][j];
					if (b.intersectsWith(a)) {
						this.aliens[i].splice(j, 1);
						j--;
						lenJ--;
						if (lenJ === 0) {
							this.aliens.splice(i, 1);
							i--;
							lenI--;
						}

						this.bullets.splice(iBullet, 1);
						iBullet--;
						lenBullets--;
					}	
				}
			}
		}

		// Alien fire
		if (Math.random() < 0.01 && this.aliens.length > 0) {
			// Find the bottom alien in a random col
			let i = Math.round(Math.random() * (this.aliens.length - 1));
			let lenJ = this.aliens[i].length;
			let a = this.aliens[i][lenJ - 1];
			
			let x = a.x + a.w / 2;
			let y = a.y + a.h;
			let w = this.screen.bulletSprite.w;
			let h = this.screen.bulletSprite.h;
			this.bullets.push(new Bullet(x, y, w, h, config.bullet.alien.speed, GameObject.BOTTOM));
			this.sound.shoot();
		}

		// Alien move	
		if (this.frame % config.game.frameLevel === 0) {
			this.frameMod2 = (this.frameMod2 + 1) % 2;

			let min = this.screen.width;
			let max = 0;
			for (let i = 0; i < this.aliens.length; i++) {
				for (let j = 0; j < this.aliens[i].length; j++) {
					let a = this.aliens[i][j];
					a.move();
					max = Math.max(max, a.right);
					min = Math.min(min, a.x);
				}
			}

			if (max > this.screen.width - config.screen.padding || min < config.screen.padding) {
				for (let i = 0; i < this.aliens.length; i++) {
					for (let j = 0; j < this.aliens[i].length; j++) {
						let a = this.aliens[i][j];
						a.stepDown();
						a.switchDirectionHorizontally();
						a.move();
					}
				}
			}
		}

		this.frame++;
	}

	_render() {
		this.screen.clear();
		for (let i = 0; i < this.aliens.length; i++) {
			for (let j = 0; j < this.aliens[i].length; j++) {
				this.screen.drawGameObject(this.aliens[i][j], this.frameMod2);
			}
		}

		for (let i = 0; i < this.bullets.length; i++) {
			this.screen.drawGameObject(this.bullets[i], this.frameMod2);
		}
		
		this.screen.drawGameObject(this.ship);
	}
}