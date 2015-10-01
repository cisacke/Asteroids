# Asteroids
Built with HTML's Canvas and JS

# Features

## Drawing elements
The elements are drawn using Canvas:
```
MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};
```

## Ship Rotation
The left and right keys rotate the ship anti-clockwise and clockwise respectively. This is achieved by:

[1] shifting the ship so that the center of the triangle is [0,0]

[2] rotating the ship by π/16 radians
```
  var new_x = [(x[0] * Math.cos(t)) - (x[1] * Math.sin(t)), (x[0] * Math.sin(t) + x[1] * Math.cos(t))];
  var new_y = [(y[0] * Math.cos(t)) - (y[1] * Math.sin(t)), (y[0] * Math.sin(t) + y[1] * Math.cos(t))];
  var new_z = [(z[0] * Math.cos(t)) - (z[1] * Math.sin(t)), (z[0] * Math.sin(t) + z[1] * Math.cos(t))];
```
[3] returning the ship to its original location on the grid

## Firing Bullets

Bullets are fired from the ship: they travel in the same direction as the ship, but at a constant speed. Unit vectors are calculated in order to achieve this:

```
  Util.unitLength = function(vel) {
    var x = vel[0];
    var y = vel[1];
    return(Math.sqrt( (x*x) + (y*y) ));
  };

  Util.unitVec = function(vel, length) {
    var x = vel[0];
    var y = vel[1];
    return ([(x/length), (y/length)]);
  };
  ```

## CSS Sprites

CSS Sprites are used to provide the images for the various asteroid sizes
