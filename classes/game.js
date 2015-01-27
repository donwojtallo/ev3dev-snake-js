var graphics = require('./graphics.js');
var buttons = require('./buttons.js');

// game data
var speed,
	frameSpeed,
	score,
	dead;
// snake
var snake,
	snakeX, snakeY,
	snakeDirection,
	snakeLength;
// map
var map,
	mapW, mapH,
	offsetX, offsetY;
// food
var foodX,
	foodY;


exports.frameSpeed = function() {
	return frameSpeed;
}

exports.init = function(callback) {
	graphics.init(callback);
}

exports.reset = function() {
	state = 0;
	speed = 1;
	frameSpeed = 500 / Math.sqrt(speed);
	score = 0;
	dead = false;
	
	snakeX = 8;
	snakeY = 5;
	snake = [[snakeX, snakeY]];
	snakeDirection = 'R'
	snakeLength = 3;
	
	offsetX = 1;
	offsetY = 2;
	mapW = 19;
	mapH = 12;
	var mapSize = mapW * mapH;
	map = new Array(mapSize);
	for(var i=0; i<mapSize; i++) {
		map[i] = false;
	}
	map[snakeY*mapW + snakeX] = true;
	
	foodX = 13;
	foodY = 9;
	
	graphics.clear();
	graphics.block(snakeX+offsetX, snakeY+offsetY);
	graphics.block(foodX+offsetX, foodY+offsetY);
	graphics.number(score, 21, 0);
}

exports.run = function(key) {

	switch(key) {
		case buttons.UP:
		if (snakeDirection != 'D') {
			snakeDirection = 'U';
		}
		break;
		
		case buttons.DOWN:
		if (snakeDirection != 'U') {
			snakeDirection = 'D';
		}
		break;
		
		case buttons.LEFT:
		if (snakeDirection != 'R') {
			snakeDirection = 'L';
		}
		break;
		
		case buttons.RIGHT:
		if (snakeDirection != 'L') {
			snakeDirection = 'R';
		}
		break;
	}
	
	// move snake
	switch(snakeDirection) {
		case 'U':
		snakeY--;
		break;
		
		case 'D':
		snakeY++;
		break;
		
		case 'L':
		snakeX--;
		break;
		
		case 'R':
		snakeX++;
	}
	// remove tail block
	if (snake.length >= snakeLength) {
		var block = snake.shift();
		graphics.block(block[0]+offsetX, block[1]+offsetY, true);
		var blockOnMap = (block[1])*mapW + (block[0]);
		map[blockOnMap] = false;
	}
	// push block
	snake.push([snakeX, snakeY]);
	var positionOnMap = snakeY*mapW + snakeX;
	graphics.block(snakeX+offsetX, snakeY+offsetY);
	
	// test
	/*for(var y=0; y<mapH; y++) {
		for(var x=0; x<mapW; x++) {
			var data = map[y*mapW+x];
			if (data == false) {
				character = ' -';
			} else {
				character = ' o';
			}
			process.stdout.write(character);
		}
		process.stdout.write('\n');
	}
	process.stdout.write('\n');*/
	//console.log(snakeX);console.log(snakeY);
	
	// feed
	if (snakeX == foodX && snakeY == foodY) {
		//console.log('feed');
		snakeLength++;
		score++;
		graphics.number(score, 21, 0);
		// spawn food
		var availablePositions = mapW * mapH - snakeLength;
		var position = Math.floor(Math.random() * availablePositions);
		var realPosition = 0;
		var countdown = position;
		while(countdown > 0) {
			countdown--;
			realPosition++;
			while (map[realPosition] == true) {
				realPosition++;
			}
		}
		foodX = realPosition % mapW ;
		foodY = Math.floor(realPosition / mapW);
		//console.log(foodX);console.log(foodY);
		graphics.block(foodX+offsetX, foodY+offsetY);
		
		speed = score * 0.5 + 1;
		frameSpeed = 500 / Math.sqrt(speed);
	}
	
	if (snakeX < 0 || snakeX > mapW || snakeY < 0 || snakeY > mapH
			|| (map[positionOnMap] == true)) {
		dead = true;
	} else {
		map[positionOnMap] = true;
	}
	
	graphics.draw();
}

exports.isDead = function() {
	return dead;
}
