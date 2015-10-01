(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (canvas) {
    this.game = new window.Asteroids.Game(canvas);
    this.ctx = canvas.getContext("2d");
  };

  GameView.prototype.start = function () {
    var game = this.game;
    var ctx = this.ctx;
    this.bindKeyHandlers();
    this.interval = setInterval(function () {
      game.step();
      game.draw(ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key("left", function(e) {
      e.preventDefault();
      game.ship.rotateLeft();
    });

    key("right", function(e) {
      e.preventDefault();
      game.ship.rotateRight();
    });

    key("up", function(e) {
      e.preventDefault();
      var vel = [game.ship.pos_x[0] - game.ship.center[0], game.ship.pos_x[1] - game.ship.center[1]];
      var length = Asteroids.Util.Ulength(vel);
      var unitMag = Asteroids.Util.unitMag(vel, length);
      game.ship.power([unitMag[0], unitMag[1]]);
    });

    key("down", function(e) {
      e.preventDefault();
    });

    key("space", function(e) {
      e.preventDefault();

      if (key.isPressed("left")) {
        game.ship.rotateLeft();
        game.ship.fireBullet();
      } else if (key.isPressed("right")) {
        game.ship.rotateRight();
        game.ship.fireBullet();
      } else {
        game.ship.fireBullet();
      }
    });
  };

}());
