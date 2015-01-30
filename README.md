# ev3dev-snake-js
A simple snake game for Lego EV3 running ev3dev firmware.
=========================================================

![alt tag](https://raw.github.com/donwojtallo/ev3dev-snake-js/master/photo.jpg)

Youtube video:

[![ev3dev-snake-js on Youtube](http://img.youtube.com/vi/kHUkGucSeU0/0.jpg)](http://www.youtube.com/watch?v=kHUkGucSeU0)

The code shows how to use LCD, buttons, sound and LEDs in Javascript (easy way).
It features:
- drawing numbers and boxes on LCD
- reading and draw PBM files (can be created using Gimp program)
- reading buttons state
- playing beep sounds
- playing wav file 
- animating LED lights under buttons

HOW TO INSTALL:
---------------

QUICK WAY

1. Grab the latest copy with all compiled dependencies [here](https://github.com/donwojtallo/ev3dev-snake-js/releases).
2. Extract the archive somewhere in /home directory.

PRO WAY

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


HOW TO RUN:
-----------

You Have 2 options:
  
- Run in a new virtual terminal:
  
  ```
  sudo openvt -s -w -- sudo --user <user> -- nodejs snake.js
  ```
  
  To run the game without sound add -no-sound parameter.
  
or
  
- You can run the game directly using Brickman's File Browser.
  This feature was implemented in version 0.4.0. If you have an older version, upgrade this way:
  
  ```
  sudo apt-get upgrade brickman
  ```
  
  Next, grant execute permissions on shell scripts:
  
  ```
  chmod u+x run-game.sh run-game-without-sound.sh
  ```
  
  Now you can run it by selecting ```run-game.sh``` or ```run-game-without-sound.sh``` from Brickmans File Browser.

Got trouble with running this game? Ask for help [here](https://github.com/donwojtallo/ev3dev-snake-js/issues).

Enjoy!
