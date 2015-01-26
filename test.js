var fs = require('fs');
var ioctl = require('ioctl');

var TTY = '/dev/tty1';

var KDSETMODE = 0x4B3A;
var KD_GRAPHICS = 0x01;
var KD_TEXT = 0x00;

fs.open(TTY, 'r+', function(err, fd) {
    if (err) {
        throw err;
    }

    var ret = ioctl(fd, KDSETMODE, KD_TEXT);
    console.log('KDSETMODE ret: ' + ret);
    fs.close(fd);
});