(function() {
  var Ball;

  Ball = (function() {

    function Ball(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.scaleFactor = 1;
      this.shadow = false;
    }

    Ball.prototype.setScaleFactor = function(newScaleFactor) {
      return this.scaleFactor = newScaleFactor;
    };

    Ball.prototype.setShadow = function(shadow) {
      return this.shadow = shadow;
    };

    Ball.prototype.draw = function(ctx) {
      var gradient, scaledRadius;
      scaledRadius = this.radius * this.scaleFactor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, scaledRadius, 0, Math.PI * 2, true);
      ctx.closePath();
      gradient = ctx.createRadialGradient(this.x, this.y, scaledRadius / 2, this.x, this.y, scaledRadius * 2);
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(0.9, 'rgb(162, 192, 255)');
      ctx.fillStyle = gradient;
      if (this.shadow) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = scaledRadius / 2;
        ctx.shadowOffsetX = scaledRadius / 10;
        ctx.shadowOffsetY = scaledRadius / 10;
      }
      return ctx.fill();
    };

    return Ball;

  })();

  window.Ball = Ball;

}).call(this);
