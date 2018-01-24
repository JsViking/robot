var ir = require('@amperka/ir-receiver')
 .connect(P0);
var light = require('@amperka/led')
 .connect(P1);
var myBuzzer = require('@amperka/buzzer').connect(P2);
var player = require('@amperka/ringtone').create(P2);
var Motor = require('@amperka/motor');
var myMotorL = Motor.connect(Motor.MotorShield.M1);
var myMotorR = Motor.connect(Motor.MotorShield.M2);
var speedL = 0;
var speedR = 0;

let melody = 'StWars:d=4,o=5,b=180:8f,8f,8f,2a#.,2f.6,8d#6,8d6,8c6,2a#.6,f.6,8d#6,8d6,8c6,2a#.6,f.6,8d#6,8d6,8d#6,2c6,p,8f,8f,8f,2a#.,2f.6,8d#6,8d6,8c6,2a#.6,f.6,8d#6,8d6,8c6,2a#.6,f.6,8d#6,8d6,8d#6,2c6';

ir.on('receive', function(code, repeat) {
 if (code === ir.keys.X) {
   if (!repeat) {
     player.play(melody, function(freq, duration) {
        if(freq === 0 && duration === 0) {
          console.log('stop');
          player.play('');
        }
     });
   }
 } else if (code === ir.keys.Y && !repeat ) {
   light.toggle();
 }
 ride(code, ir, repeat);
});

let ride = function(direction, receiver, repeat) {
  if (direction == receiver.keys.TOP && !repeat) {
    if (speedL < 1 && speedR < 1) {
      speedL = speedL + 0.1;
      speedR = speedR + 0.1;
    }
    if (speedR < 1) {
      speedR = speedR + 0.1;
    }
  } else if (direction == receiver.keys.POWER && !repeat) {
      speedL = 0;
      speedR = 0;
  } else if (direction == receiver.keys.BOTTOM && !repeat) {
    if (speedL > -1 && speedR > -1) {
      speedL = speedL - 0.1;
      speedR = speedR - 0.1;
    }
    if (speedR > -1) {
      speedR = speedR - 0.1;
    }
  } else if (direction == receiver.keys.LEFT && !repeat) {
    if (speedL > -1) {
      speedL = speedL - 0.1;
    }
    if (speedR < 1) {
        speedR = speedR + 0.1;
    }
  } else if (direction == receiver.keys.RIGHT && !repeat) {
    if (speedL < 1) {
      speedL = speedL + 0.1;
    }
    if (speedR > -1) {
      speedR = speedR - 0.1;
    }
  }
    myMotorL.write(speedL);
    myMotorR.write(speedR);
  console.log('speedL - ', speedL);
  console.log('speedR - ', speedR);
};
