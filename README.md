# ev3dev-snake-js
A simple snake game for Lego EV3 running ev3dev firmware.

![alt tag](https://raw.github.com/donwojtallo/ev3dev-snake-js/master/photo.jpg)

The code shows how to use LCD, buttons, sound and LEDs in Javascript (easy way).
It features:
- drawing numbers and boxes on LCD
- reading and draw PBM files (can be created using Gimp program)
- reading buttons state
- playing beep sounds
- playing wav file 
- animating LED lights under buttons

How to install and run:

1. You need to have ev3dev firmware installed on sd card: http://www.ev3dev.org/. I highly recommend to setup the Internet     connection on your EV3 brick. Otherwise, you will need to install some dependencies manually.
  We will download some Debian packages, so make sure that package lists are up to date:
  ```
  sudo apt-get update
  ```
  
2. Install GCC and Make (required by ioctl module):
  ```
  sudo apt-get install build-essential
  ```
  
3. For version ev3dev-jessie-2014-12-01 and older install NodeJS-legacy (required by ioctl module):
  ```
  sudo apt-get install nodejs-legacy
  ```
  
4. Copy game to sd card. Make sure that the user have right privileges to write in game folder.
  You can clone this game directly from Github. To install Git on EV3:
  ```
  sudo apt-get install git
  ```
  To clone the repository:
  ```
  git clone https://github.com/donwojtallo/ev3dev-snake-js.git
  ```
  
5. Go to game folder:
  ```
  cd <path-to-game-folder>
  ```
  
6. Install dependencies:
  ```
  npm install
  ```
  
7. Run the game in a new virtual terminal:
  ```
  sudo openvt -s -w -- sudo --user <user> -- nodejs snake.js
  ```
  To run the game without sound add -no-sound parameter.

Enjoy!
