(function() {
  var BallApp, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = null;

  jQuery(function() {
    app = new BallApp($('#canvas')[0]);
    $(window).resize(function() {
      return app.redraw();
    });
    $('#scaleFactor').on('change', function(event) {
      var value;
      value = $('#scaleFactor').val();
      return app.setScaleFactor(value);
    });
    $('#clear').on('click', function(event) {
      return app.clearCanvas();
    });
    $('#toggleShadow').on('click', function(event) {
      return app.toggleShadow();
    });
    return $('#addBall').on('click', function(event) {
      return app.addRandomBall();
    });
  });

  BallApp = (function(_super) {

    __extends(BallApp, _super);

    function BallApp(canvas) {
      BallApp.__super__.constructor.call(this, canvas);
      this.scaleFactor = 1;
      this.shadow = false;
      this.balls = [];
      this.draw();
    }

    BallApp.prototype.clearCanvas = function() {
      this.balls = [];
      return this.clear();
    };

    BallApp.prototype.addBall = function(x, y, radius) {
      this.balls.push(new Ball(x, y, radius));
      return this.redraw();
    };

    BallApp.prototype.addRandomBall = function() {
      var radius, x, y;
      x = (Math.random() * this.fullWidth + Math.random() * this.fullWidth) / 2;
      y = (Math.random() * this.fullHeight + Math.random() * this.fullHeight) / 2;
      radius = (Math.random() * this.halfWidth / 2 + Math.random() * this.halfWidth / 2) / 2;
      return this.addBall(x, y, radius);
    };

    BallApp.prototype.setScaleFactor = function(newScaleFactor) {
      var _this = this;
      this.scaleFactor = newScaleFactor;
      $.each(this.balls, function(index, item) {
        return item.setScaleFactor(_this.scaleFactor);
      });
      return this.redraw();
    };

    BallApp.prototype.toggleShadow = function() {
      var _this = this;
      this.shadow = !this.shadow;
      $.each(this.balls, function(index, item) {
        item.setShadow(_this.shadow);
        return false;
      });
      return this.redraw();
    };

    BallApp.prototype.drawContent = function() {
      var _this = this;
      return $.each(this.balls, function(index, item) {
        return item.draw(_this.ctx);
      });
    };

    return BallApp;

  })(AppBase);

}).call(this);
