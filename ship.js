(function(){
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (argsObj) {
    Ship.COLOR = "gray";
    // this.vel = [0, 0];
    // Ship.RADIUS = 10;
    this.game = argsObj.game;
    this.pos_x = argsObj.pos_x;
    this.pos_y = [this.pos_x[0] + 10, this.pos_x[1] + 25];
    this.pos_z = [this.pos_x[0] - 10, this.pos_x[1] + 25];
    this.center = this.calculateCenter();
    // this.pos = this.center;
    Ship.RADIUS = 15;



    window.Asteroids.MovingObject.call(this, {"pos": this.center,
                                              "vel": [0,0],
                                              "color": Ship.COLOR,
                                              "radius": Ship.RADIUS,
                                              "game": argsObj.game});
   console.log(this);
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.pos_x[0], this.pos_x[1]);
    ctx.lineTo(this.pos_y[0], this.pos_y[1]);
    ctx.lineTo(this.pos_z[0], this.pos_z[1]);
    ctx.closePath();
    ctx.fillStyle = "#d3d3d3";
    ctx.fill();
  };

  Ship.prototype.move = function() {
    // debugger
    var oldPos_x = this.pos_x;
    this.pos_x[0] = oldPos_x[0] + this.vel[0];
    this.pos_x[1] = oldPos_x[1] + this.vel[1];

    var oldPos_y = this.pos_y;
    this.pos_y[0] = oldPos_y[0] + this.vel[0];
    this.pos_y[1] = oldPos_y[1] + this.vel[1];

    var oldPos_z = this.pos_z;
    this.pos_z[0] = oldPos_z[0] + this.vel[0];
    this.pos_z[1] = oldPos_z[1] + this.vel[1];

    this.center = this.calculateCenter();
    this.pos = this.center;

    if (this.game.isOutofBounds(this.pos_x)) {
      if (this instanceof Asteroids.Asteroid || this instanceof Asteroids.Ship) {
        this.wrap();
      } else {
        this.game.remove(this);
      }
    }

  };

  Ship.prototype.wrap = function() {
    var posZxDiff = this.pos_z[0] - this.pos_x[0];
    var posZyDiff = this.pos_z[1] - this.pos_x[1];

    var posYxDiff = this.pos_y[0] - this.pos_x[0];
    var posYyDiff = this.pos_y[1] - this.pos_x[1];

    var oldPosX = this.pos_x;
    if (this.pos_x[0] > this.game.DIM_X) { this.pos_x[0] = 0; }
    if (this.pos_x[0] < 0) { this.pos_x[0] = this.game.DIM_X; }
    if (this.pos_x[1] > this.game.DIM_Y) { this.pos_x[1] = 0; }
    if (this.pos_x[1] < 0) { this.pos_x[1] = this.game.DIM_Y; }

    this.pos_y = [this.pos_x[0] + posYxDiff, this.pos_x[1] + posYyDiff];
    this.pos_z = [this.pos_x[0] + posZxDiff, this.pos_x[1] + posZyDiff];
  };

  Ship.prototype.calculateCenter = function() {
    var x = (this.pos_x[0] + this.pos_y[0] + this.pos_z[0]) / 3;
    var y = (this.pos_x[1] + this.pos_y[1] + this.pos_z[1]) / 3;
    return [x, y];
  };

  Ship.prototype.relocate = function () {
    this.pos_x = this.game.randomPos();
    this.pos_y = [this.pos_x[0] + 10, this.pos_x[1] + 25];
    this.pos_z = [this.pos_x[0] - 10, this.pos_x[1] + 25];
    this.center = this.calculateCenter();
    this.pos = this.center;

    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    // debugger
    var oldVel = this.vel;

    if (this.vel[0] < 12 && this.vel[0] > -12) {
      this.vel[0] = impulse[0] + oldVel[0];
    }
    if (this.vel[1] < 12 && this.vel[1] > -12) {
      this.vel[1] = impulse[1] + oldVel[1];
    }

    if (this.vel[0] === 12 && (impulse[0] < 0)) {
      this.vel[0] = impulse[0] + oldVel[0];
    }

    if (this.vel[0] === -12 && (impulse[0] > 0)) {
      this.vel[0] = impulse[0] + oldVel[0];
    }

    if (this.vel[1] === 12 && (impulse[1] < 0)) {
      this.vel[1] = impulse[1] + oldVel[1];
    }

    if (this.vel[1] === -12 && (impulse[1] > 0)) {
      this.vel[1] = impulse[1] + oldVel[1];
    }
  };
  //
  // Ship.prototype.isCollidedWith = function (otherObject) {
  //   // debugger
  //   return (window.Asteroids.Util.distance(this, otherObject)) <
  //         (16 + otherObject.radius);
  // };

  Ship.prototype.rotateRight = function() {
    // ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
    var moveToZero = this.moveToZero();
    var rotate = this.rotate(moveToZero, {clockwise: true});
    var moveBack = this.moveBack(rotate);
    this.pos_x = moveBack[0];
    this.pos_y = moveBack[1];
    this.pos_z = moveBack[2];

    this.updateVel();
    this.center = this.calculateCenter();
    this.pos = this.center;
    // debugger
    // move to zero
    // rotate
    // move back

  };

  Ship.prototype.rotateLeft = function() {
    var moveToZero = this.moveToZero();
    var rotate = this.rotate(moveToZero, {clockwise: false});
    var moveBack = this.moveBack(rotate);
    this.pos_x = moveBack[0];
    this.pos_y = moveBack[1];
    this.pos_z = moveBack[2];

    this.center = this.calculateCenter();
    this.pos = this.center;
    this.updateVel();
  };

  Ship.prototype.updateVel = function() {
    var vel = [this.pos_x[0] - this.center[0], this.pos_x[1] - this.center[1]];
    var oldLength = Asteroids.Util.Ulength(this.vel);
    // debugger
    var length = Asteroids.Util.Ulength(vel);
    var unitMag = Asteroids.Util.unitMag(vel, length);
    var oldVel = this.vel;
    this.vel = [unitMag[0] * oldLength, unitMag[1] * oldLength];
  };

  Ship.prototype.moveToZero = function() {
    var new_x = [this.pos_x[0] - this.center[0], this.pos_x[1] - this.center[1]];
    var new_y = [this.pos_y[0] - this.center[0], this.pos_y[1] - this.center[1]];
    var new_z = [this.pos_z[0] - this.center[0], this.pos_z[1] - this.center[1]];
    return [new_x, new_y, new_z];
  };

  Ship.prototype.rotate = function(moveToZero, options) {
    // debugger
    var x = moveToZero[0];
    var y = moveToZero[1];
    var z = moveToZero[2];
    var t = options.clockwise ? (Math.PI / 16) : (-(Math.PI / 16));
    var new_x = [(x[0] * Math.cos(t)) - (x[1] * Math.sin(t)), (x[0] * Math.sin(t) + x[1] * Math.cos(t))];
    var new_y = [(y[0] * Math.cos(t)) - (y[1] * Math.sin(t)), (y[0] * Math.sin(t) + y[1] * Math.cos(t))];
    var new_z = [(z[0] * Math.cos(t)) - (z[1] * Math.sin(t)), (z[0] * Math.sin(t) + z[1] * Math.cos(t))];
    return [new_x, new_y, new_z];
  };

  Ship.prototype.moveBack = function(rotate) {
    var x = rotate[0];
    var y = rotate[1];
    var z = rotate[2];
    var new_x = [x[0] + this.center[0], x[1] + this.center[1]];
    var new_y = [y[0] + this.center[0], y[1] + this.center[1]];
    var new_z = [z[0] + this.center[0], z[1] + this.center[1]];
    return [new_x, new_y, new_z];
  };

  Ship.prototype.fireBullet = function () {
    // console.log(this.vel);
    var shipLength = window.Asteroids.Util.Ulength(this.vel);
    // console.log("ship length-->", shipLength);
    var shipUnitMag = window.Asteroids.Util.unitMag(this.vel, shipLength);
    var bullet = new window.Asteroids.Bullet ( { "pos": [(this.pos_x[0] + 3), (this.pos_x[1] + 3)],
                                                 "vel": [ (shipUnitMag[0] * 13), (shipUnitMag[1] * 13) ],
                                                 "game": this.game } );
    this.game.add(bullet);
    // console.log(bullet)
    // console.log(this.game.bullets)
  };

}());
