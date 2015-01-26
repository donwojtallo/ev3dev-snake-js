var fs = require("fs");
var fd;
var reverseBitsTable = require("./reverse-bits-table");

var frameBufferFile = '/dev/fb0';

var bufferSize = 3072;
var buffer;
var map;

exports.init = function (callback) {
	buffer = new Buffer(bufferSize);
	//buffer.fill(0);
	fs.open(frameBufferFile, "w", function(error, fileDesc) {
		fd = fileDesc;
		fs.write(fd, buffer);
		
		// load pbm, it needs to be 192x128
		fs.readFile('./data/map.pbm', function (err, data) {
			var lines = data.toString('ascii').split("\n");
			var skipped = 0;
			var bytesToSkip = 0;
			for(var i=0; i<lines.length; i++) {
				bytesToSkip += lines[i].length + 1;
				if (lines[i][0] != '#') {	// not a comment
					skipped++;
					if (skipped == 3) {
						bytesToSkip -= lines[i].length + 1;
						map = new Buffer(data.slice(bytesToSkip));
						break;
					}
				}
			}
			// reverse bits in bytes
			for(var i=0; i<3072; i++) {
				map[i] = reverseBitsTable.lookup[map[i]];
			}
			
			callback();
		});
	});
};

exports.clear = function() {
	//buffer.fill(0);
	map.copy(buffer);
}

exports.draw = function() {
	fs.write(fd, buffer, 0, bufferSize, 0);
}

// 24x14
exports.block = function(x, y) {
	block(x, y, false);
}

exports.block = function(x, y, white) {
	var pos = (y*192)+x;
	var row = white ? 0 : 126;
	
	for (var i=0; i<144; i+=24) {
		buffer.writeUInt8(row, pos+i);
	}
}

exports.number = function(number, x, y) {
	var pos = (y*192)+x;
	do {
		digit = number % 10;
		
		buffer.writeUInt8(numbers[digit][0], pos);
		buffer.writeUInt8(numbers[digit][0], pos+24);
		buffer.writeUInt8(numbers[digit][1], pos+48);
		buffer.writeUInt8(numbers[digit][1], pos+72);
		buffer.writeUInt8(numbers[digit][2], pos+96);
		buffer.writeUInt8(numbers[digit][2], pos+120);
		buffer.writeUInt8(numbers[digit][3], pos+144);
		buffer.writeUInt8(numbers[digit][3], pos+168);
		buffer.writeUInt8(numbers[digit][4], pos+192);
		buffer.writeUInt8(numbers[digit][4], pos+216);
		
		number = Math.floor(number/10);
		pos -= 1;
	} while(number > 0);
}


var numbers = [
	[126, 102, 102, 102, 126],	// 0 
	[ 96,  96,  96,  96,  96],	// 1
	[126,  96, 126,   6, 126],	// 2
	[126,  96, 126,  96, 126],	// 3
	[102, 102, 126,  96,  96],	// 4
	[126,   6, 126,  96, 126],	// 5
	[126,   6, 126, 102, 126],	// 6
	[126,  96,  96,  96,  96],	// 7
	[126, 102, 126, 102, 126],	// 8
	[126, 102, 126,  96, 126],	// 9
]