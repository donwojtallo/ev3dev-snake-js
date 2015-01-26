var fs = require("fs");

var keysEventsFile = '/dev/input/by-path/platform-gpio-keys.0-event';

exports.UP = 103;
exports.DOWN = 108;
exports.LEFT = 105;
exports.RIGHT = 106;
exports.ENTER = 28;
exports.ESCAPE = 14;

var lastKey = false;
var exitButton,
	exitCallback;
var privateCallback;


exports.exitButton = function(button, callback) {
	exitButton = button;
	exitCallback = callback;
}

exports.getLastKey = function(stopReading) {
	if (typeof stopReading != 'undefined' && stopReading == true) {
		enabled = false;
	}
	return lastKey;
}

exports.enable = function() {
	enabled = true;
	read();
}

var read = function() {
	fs.open(keysEventsFile, "r", function(error, fd) {
		if (error) {
			console.log(error);
		}
		var buffer = new Buffer(16);

		fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
			var code = buffer.readUInt16LE(10);
			var value = buffer.readUInt32LE(12);
			lastKey = code;
			//console.log('code: ' + code + '; value: ' + value);
			
			fs.close(fd);
			
			if (lastKey == exitButton) {	// escape terminates buttons thread
				exitCallback();
			} else {
				read();
			}
		});
	});
}
