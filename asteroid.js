(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (argsObj) {
    Asteroid.COLOR = "green";
    Asteroid.RADIUS = 64;
    window.Asteroids.MovingObject.call(this, {"pos": argsObj.pos,
                                              "vel": argsObj.vel || window.Asteroids.Util.randomVec(5),
                                              "color": Asteroid.COLOR,
                                              "radius": argsObj.radius || Asteroid.RADIUS,
                                              "game": argsObj.game});
  };

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.relocate();
      this.game.lives -= 1;
      if (this.game.lives === 0) {
        this.game.end();
        // game over
      }
    }
  };

  Asteroid.prototype.draw = function(ctx, options) {
    var asteroid = new Image();
    asteroid.src = "asteroid1.png";
    if (this.radius === 64) {
      ctx.drawImage(asteroid, 0, 0, 200, 165, this.pos[0] - 64, this.pos[1] - 64, 128, 128);
    } else {
      ctx.drawImage(asteroid, 0, 200, 100, 83, this.pos[0] - 32, this.pos[1] - 32, 64, 64);
    }
    // this.pos[0] += 40;
    // this.pos[1] += 40;
  };



}());
