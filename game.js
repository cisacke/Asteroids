(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function (canvasEl) {
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    console.log (this.DIM_Y);
    console.log (this.DIM_X);
    this.NUM_ASTEROIDS = 4;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.level = 1;
    this.lives = 5;

    this.ship = new window.Asteroids.Ship({ "game": this,
                                            "pos_x": this.randomPos()});

  };

  Game.prototype.end = function() {
    this.allObjects().forEach(function(object) {
      object.game.remove(object);
    });
    // clearInterval(this.interval);

    $(".start-game").removeClass("in-progress");
    $("button").on("click", function() {
      var canvasEl = document.getElementById("game-canvas");
      canvasEl.height = window.innerHeight;
      canvasEl.width = window.innerWidth;
      $(".start-game").addClass("in-progress");
      var gameView = new window.Asteroids.GameView(canvasEl);
      // this.game = new window.Asteroids.Game(canvasEl, {gameView: this});
      gameView.start();
    }.bind(this));
    // debugger
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Ship) {
      // ship.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.levelUp = function() {
    this.lives = 5;
    this.level += 1;
    var score = parseInt($(".level").text());
    $(".level").text(score + 1);

    this.NUM_ASTEROIDS += 2;
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new window.Asteroids.Asteroid( { "pos": this.randomPos(),
                                                           "game": this } ));
    }
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.draw = function (ctx) {

      ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
      this.allObjects().forEach(function(object) {
        object.draw(ctx, {radius: 40});
      });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] > this.DIM_X) { pos[0] = 0; }
    if (pos[0] < 0) { pos[0] = this.DIM_X; }
    if (pos[1] > this.DIM_Y) { pos[1] = 0; }
    if (pos[1] < 0) { pos[1] = this.DIM_Y; }
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = 0; j < this.allObjects().length; j++) {
        if (i === j) { continue; }
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {

      this.moveObjects();
      this.checkCollisions();

  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else {
      this.allObjects().splice(0, 1);
    }
  };

  Game.prototype.randomPos = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x,y];
  };

  Game.prototype.isOutofBounds = function(pos) {
    var x = pos[0];
    var y = pos[1];
    var outOfBounds = false;

    if (x < 0 || x > this.DIM_X || y < 0 || y > this.DIM_Y) {
      outOfBounds = true;
    }

    return outOfBounds;
  };

  Game.prototype.score = function() {
    var score = parseInt($(".score").text());
    $(".score").text(score + 10);
  };

}());
