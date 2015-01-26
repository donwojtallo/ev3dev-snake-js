# ev3dev-snake-js
A snake game for Lego EV3 running ev3dev firmware.

WORK IN PROGRESS. Please, do not report issues yet.

The code is lame but it shows how to use LCD, buttons, sound and LEDs in Javascript.
It features:
- drawing numbers and boxes on LCD
- reading and draw PBM files (can be created using Gimp program)
- reading buttons state
- playing beep sounds
- playing wav file 
- animating LED lights under buttons

How to install and run:
1. You need to have ev3dev firmware installed on sd card: http://www.ev3dev.org/
2. Install GCC and Make:
```
apt-get install build-essential
```
3. For version ev3dev-jessie-2014-12-01 and older install NodeJS-legacy:
```
apt-get install nodejs-legacy
```
4. Copy game to sd card. Make sure that the user have right privileges to write in game folder.
5. Go to game folder:
```
cd <path-to-game-folder>
```
6. Install dependencies:
```
npm install
```
7. Run the game in a new virtual :
```
sudo openvt -s -w -- sudo --user wojtal -- nodejs snake.js
```

Enjoy!
