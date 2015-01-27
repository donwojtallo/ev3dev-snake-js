// snake

var fs = require('fs');
//var ioctl = require('src-ioctl');	// this module doesn't work
var ioctl = require('ioctl');
var sys = require('sys');
var exec = require('child_process').exec;

var sound = require('./classes/sound.js');
var buttons = require('./classes/buttons.js');
var game = require('./classes/game.js');
var led = require('./classes/led.js');

var KDSETMODE = 0x4B3A;
var KD_GRAPHICS = 0x01;
var KD_TEXT = 0x00;

// switch terminal mode
//exec('systemctl stop brickman');
var vtfd = fs.openSync('/dev/tty', 'r+');
var ret = ioctl(vtfd, KDSETMODE, KD_GRAPHICS);
console.log('ioctl: ' + ret);

// on exit
var gameExit = function() {
	led.clear();
	//exec('systemctl start brickman');
	var ret = ioctl(vtfd, KDSETMODE, KD_TEXT);
	console.log('ioctl: ' + ret);
	fs.close(vtfd);
	process.exit();
}
process.on('SIGINT', gameExit);


buttons.exitButton(buttons.ESCAPE, gameExit);
buttons.enable();

var state=0;

// main loop
var mainLoop = function() {
	switch(state) {
		case 0:
		// wait for introSound
		game.reset();
		//sound.intro();
		state = 1;
		setTimeout(mainLoop, 1);
		break;
		
		case 1:
		// game on
		var key = buttons.getLastKey(true);
		game.run(key);
		if (game.isDead()) {
			state++;
			// dead
			//sound.dead();
			setTimeout(mainLoop, 1);
		} else {
			setTimeout(mainLoop, game.frameSpeed());
		}
		break;
		
		case 2:
		var key = buttons.getLastKey();
		if (key == buttons.ENTER) {
			led.clear();
			state = 0;
			setTimeout(mainLoop, 1);
		} else {
			led.animate();
			setTimeout(mainLoop, 30);
		}
		break;
	};
}

sound.init();
game.init(function(){
	mainLoop();
});
