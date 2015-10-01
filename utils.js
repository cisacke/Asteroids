(function () {
  window.Asteroids = window.Asteroids || {};

  var Util = window.Asteroids.Util = function () {};

  Util.inherits = function(childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function(length) {
    var x = Math.floor(Math.random() * (length + length) - length);
    var y = Math.floor(Math.sqrt((length * length) - (x * x)));
    return [x, y];
  };

  Util.distance = function(object1, object2) {
    return Math.sqrt(Math.pow((object1.pos[0] - object2.pos[0]), 2) +
    Math.pow((object1.pos[1] - object2.pos[1]), 2));
  };

  Util.Ulength = function(vel) {
    var x = vel[0];
    var y = vel[1];
    return(Math.sqrt( (x*x) + (y*y) ));
  };

  Util.unitMag = function(vel, length) {
    var x = vel[0];
    var y = vel[1];
    return ([(x/length), (y/length)]);
  };
}());
