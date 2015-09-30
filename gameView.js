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

  GameView.prototype.end = function() {
    // clearInterval(this.interval);
    //
    // $(".start-game").removeClass("in-progress");
    // $("button").on("click", function() {
    //   // var canvasEl = document.getElementById("game-canvas");
    //   // canvasEl.height = window.innerHeight;
    //   // canvasEl.width = window.innerWidth;
    //   $(".start-game").addClass("in-progress");
    //   var gameView = new window.Asteroids.GameView(canvasEl);
    //   this.game = new window.Asteroids.Game(canvasEl, {gameView: this});
    //   gameView.start();
    // }.bind(this));
    // // debugger
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key("left", function(e) {
      e.preventDefault();
      game.ship.rotateLeft();


      // if (key.isPressed("w")) {
      //   game.ship.power([-1, -1]);
      // } else if (key.isPressed("s")) {
      //   game.ship.power([-1, 1]);
      // } else {
      //   game.ship.power([-1, 0]);
      // };
    });

    key("right", function(e) {
      e.preventDefault();
      game.ship.rotateRight();
      // debugger
      // if (key.isPressed("a")) {
      //   game.ship.power([-1, -1]);
      // } else if (key.isPressed("d")) {
      //   game.ship.power([1, -1]);
      // } else {
      //   game.ship.power([0, -1]);
      // }
    });

    key("up", function(e) {
      e.preventDefault();
      // debugger
      var vel = [game.ship.pos_x[0] - game.ship.center[0], game.ship.pos_x[1] - game.ship.center[1]];
      var length = Asteroids.Util.Ulength(vel);
      var unitMag = Asteroids.Util.unitMag(vel, length);
      // debugger
      game.ship.power([unitMag[0], unitMag[1]]);
      // if (key.isPressed("w")) {
      //   game.ship.power([1, -1]);
      // } else if (key.isPressed("s")) {
      //   game.ship.power([1, 1]);
      // } else {
      //   game.ship.power([1, 0]);
      // }
    });

    key("down", function(e) {
      e.preventDefault();
      // if (key.isPressed("a")) {
      //   game.ship.power([-1, 1]);
      // } else if (key.isPressed("d")) {
      //   game.ship.power([1, 1]);
      // } else {
      //   game.ship.power([0, 1]);
      // };
    });

    key("space", function(e) {
      e.preventDefault();
      // console.log(game)

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
