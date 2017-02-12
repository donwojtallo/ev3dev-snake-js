var ev3 = require('ev3dev-lang');

var greenLeft = new ev3.LED('ev3:left:green');
var greenRight = new ev3.LED('ev3:right:green');
var redLeft = new ev3.LED('ev3:left:red');
var redRight = new ev3.LED('ev3:right:red');

var time = 0.0;
var speed = 0.3;

exports.animate = function() {
	time += speed
	var upValue = Math.round(Math.sin(time) * 127.5 + 127.5);
	var downValue = Math.round(255 - upValue);
	greenLeft.brightness = upValue;
	greenRight.brightness = downValue;
	redLeft.brightness = downValue;
	redRight.brightness = upValue;
}

exports.clear = function() {
	greenLeft.brightness = greenRight.brightness = redLeft.brightness = redRight.brightness = 0;
}
