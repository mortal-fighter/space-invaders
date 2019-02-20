'use strict';

let app = null;
let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

$(document).ready(() => {
	if (!isMobile) {
		$('.buttons').hide();
	}
	
	if (isMobile) {
		$('#' + config.container.id).addClass('container-mobile');
		
		$('#sound').hide();

		resizeContainer();
		whenDimensionsChange(document.querySelector('body'), resizeContainer);
	}

	if (!config.audio.enable) {
		$('#sound').toggleClass('sound-off');
	}

	app = new App(isMobile);
	app.init(() => {
		app.run();

		$('#sound').on('click', () => {
			app.toggleSound();
			$('#sound').toggleClass('sound-off');
		});
	});

});

function resizeContainer() {
	let h = $('body').height();
	$('#container').height(h - config.screen.mobile.buttonAreaHeight);
}

function whenDimensionsChange(element, callback) {
	let curWidth = $(element).width();
	let curHeight = $(element).height();
	let interval = setInterval(() => {
		if (curWidth !== $(element).width() && curHeight !== $(element).height()) {
			curWidth = $(element).width();
			curHeight = $(element).height();
			callback();
		}
	}, 200);
}