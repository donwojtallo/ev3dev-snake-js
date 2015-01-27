var sys = require('sys')
var exec = require('child_process').exec;

noSound = false;

for (var i=0; i<process.argv.length; i++) {
	if (process.argv[i] == '-no-sound') {
		noSound = true;
	};
};

exports.init = function() {
	if (!noSound) {
		exec('amixer set Playback,0 30%');
	}
}

exports.intro = function() {
	if (!noSound) {
		exec( 'beep '
			+ '-f 523.2 -l 50 -D 100 '
			+ '-n -f 523.2 -l 50 -D 25 -r 2 '
			+ '-n -f 523.2 -l 50 -D 100 '
			+ '-n -f 392.0 -l 50 -D 100 '
			+ ''
			+ '-n -f 659.2 -l 50 -D 100 '
			+ '-n -f 659.2 -l 50 -D 25 -r 2 '
			+ '-n -f 659.2 -l 50 -D 100 '
			+ '-n -f 523.2 -l 50 -D 100 '
			+ ''
			+ '-n -f 784.0 -l 50 -D 100 '
			+ '-n -f 659.2 -l 50 -D 100 '
			+ '-n -f 784.0 -l 50 -D 100 '
			+ '-n -f 659.2 -l 50 -D 100 '
			+ ''
			+ '-n -f 1046.4 -l 150');
	}
}

exports.dead = function() {
	if (!noSound) {
		//exec('espeak "Game over!" --stdout | aplay');
		exec('aplay ./data/tada.wav');
	}
}

exports.beep = function() {
	if (!noSound) {
		exec( 'beep -f 400 -l 50');
	}
}

exports.highBeep = function() {
	if (!noSound) {
		exec( 'beep -f 800 -l 50');
	}
}