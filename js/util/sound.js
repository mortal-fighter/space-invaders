'use strict';

class Sound {
	constructor(isEnabled) {
		this.isEnabled = isEnabled;
		this._checkIsPlayable();
	}

	enable() {
		this.isEnabled = true;
		this._checkIsPlayable();
	}

	disable() {
		this.isEnabled = false;
	}

	shoot() {
		if (!this.canPlay || !this.isEnabled) {
			return;
		}
		this.sounds['shoot'].play();
	}

	theme() {
		if (!this.canPlay || !this.isEnabled) {
			return;
		}
		this.sounds['theme'].play();
	}	

	pauseAll() {
		if (!this.canPlay || !this.isEnabled) {
			return;
		}
		$.each(this.sounds, (key, value) => {
			value.pause();
		});
	}

	playAll() {
		if (!this.canPlay || !this.isEnabled) {
			return;
		}
		$.each(this.sounds, (key, value) => {
			value.play();
		});
	}

	_checkIsPlayable() {
		try {
			this.sounds = {
				shoot: new Audio(config.audio.shoot),
				theme: $(new Audio(config.audio.theme)).prop('loop', true).get(0)
			}
			this.canPlay = true;
		} catch(err) {
			this.canPlay = false;
		} 
	}
}