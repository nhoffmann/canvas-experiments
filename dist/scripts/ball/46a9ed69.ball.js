(function() {
  var Ball,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ball = (function(_super) {

    __extends(Ball, _super);

    function Ball(x, y, radius, scaleFactor) {
      Ball.__super__.constructor.call(this, x + radius, y + radius, radius * 2, radius * 2);
      this.radius = radius;
      this.scaleFactor = scaleFactor;
      this.shadow = false;
    }

    Ball.prototype.draw = function(ctx) {
      var gradient, scaledRadius;
      scaledRadius = this.radius * this.scaleFactor;
      ctx.save();
      gradient = ctx.createRadialGradient(this.x, this.y, scaledRadius / 2, this.x, this.y, scaledRadius * 2);
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(0.9, 'rgb(162, 192, 255)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, scaledRadius, 0, Math.PI * 2, false);
      ctx.closePath();
      if (this.shadow) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = scaledRadius / 2;
        ctx.shadowOffsetX = scaledRadius / 10;
        ctx.shadowOffsetY = scaledRadius / 10;
      }
      ctx.fill();
      return ctx.restore();
    };

    return Ball;

  })(Sprite);

  window.Ball = Ball;

}).call(this);
