let config = {
	screen: {
		width: 510,
		height: 600,
		padding: 30,
		mobile: {
			buttonAreaHeight: 100
		}
	},

	game: {
		alienInRow: 10,
		alienInCol: 5, 
		alienTypesInRow: [0, 1, 1, 2, 2],
		alienRowsExtraSpace: [4, 0, 0],
		frameLevel: 60
	},
	
	alien: {
		padding: 30,
		speed: 30
	},
	
	ship: {
		speed: 4
	},
	
	bullet: {
		ship: {
			speed: 8,
			offsetX: 10
		},
		alien: {
			speed: 4
		}
		
	},
	
	container: {
		id: 'container'
	},
	
	sprite: {
		src: 'img/sprite.png'
	},
	
	audio: {
		enable: false,
		shoot: 'audio/shoot.mp3',
		theme: 'audio/eye_of_the_tiger.mp3'
	}
}