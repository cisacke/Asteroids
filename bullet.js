(function () {
  window.Asteroids = window.Asteroids || {};

  var Bullet = window.Asteroids.Bullet = function (argsObj) {
    Bullet.COLOR = "#7a7a7a";
    Bullet.RADIUS = 3;
    window.Asteroids.MovingObject.call(this, {"pos": argsObj.pos,
                                              "vel": argsObj.vel,
                                              "color": Bullet.COLOR,
                                              "radius": Bullet.RADIUS,
                                              "game": argsObj.game});
  };

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Asteroid) {
      this.game.score();

      var unitMag = Asteroids.Util.unitMag(this.vel, 5);
      var length = Asteroids.Util.Ulength(otherObject.vel);
      // var oldVel = this.vel;
      this.game.remove(this);
      var oldRadius = otherObject.radius;
      var oldPos = otherObject.pos;
      // debugger;
      this.game.remove(otherObject);

      // console.log(this.game.asteroids.length);

      if (this.game.asteroids.length <= 1) {
        this.game.levelUp();
      }

      if (oldRadius !== 32) {
      var asteroid = new window.Asteroids.Asteroid({
        radius: (oldRadius / 2),
        vel: [(unitMag[1]) * -2, unitMag[0] * 2],
        pos: [oldPos[0] - 0.1, oldPos[1] + 0.1],
        game: this.game

      });

      var asteroidTwo = new window.Asteroids.Asteroid({
        radius: (oldRadius / 2),
        vel: [(unitMag[1]) * 2, unitMag[0] * -2],
        pos: [oldPos[0] - 0.1, oldPos[1] - 0.1],
        game: this.game
      });
      // debugger
      this.game.asteroids.push(asteroid);
      this.game.asteroids.push(asteroidTwo);
      }
      // 1. delete asteroid (otherObject)
      // 2. create two new asteroids
    }
  };

  Bullet.prototype.isWrappable = function() {
    return false;
  };

}());
