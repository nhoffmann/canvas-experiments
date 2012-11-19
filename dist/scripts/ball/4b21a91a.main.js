(function() {
  var BallApp, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = null;

  jQuery(function() {
    var stage;
    stage = new Stage($('#canvas')[0]);
    app = new BallApp(stage);
    $(window).resize(function() {
      return stage.redraw();
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
      return app.addRandomBall(Utils.randomIntBayesian(stage.halfWidth));
    });
  });

  BallApp = (function(_super) {

    __extends(BallApp, _super);

    BallApp.prototype.balls = [];

    function BallApp(stage) {
      BallApp.__super__.constructor.call(this, stage);
      this.scaleFactor = 1;
      this.shadow = false;
    }

    BallApp.prototype.addBall = function(x, y, radius) {
      var ball;
      ball = new Ball(x, y, radius, this.scaleFactor);
      this.stage.addSprite(ball);
      this.balls.push(ball);
      return ball;
    };

    BallApp.prototype.addRandomBall = function(radius) {
      var x, y;
      x = Utils.randomIntBayesian(this.stage.fullWidth);
      y = Utils.randomIntBayesian(this.stage.fullHeight);
      return this.addBall(x, y, radius);
    };

    BallApp.prototype.setScaleFactor = function(newScaleFactor) {
      var ball, setFactor, _i, _len, _ref, _results,
        _this = this;
      this.scaleFactor = newScaleFactor;
      setFactor = function(ball) {
        return ball.scaleFactor = _this.scaleFactor;
      };
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(setFactor(ball));
      }
      return _results;
    };

    BallApp.prototype.toggleShadow = function() {
      var ball, setShadow, _i, _len, _ref, _results,
        _this = this;
      this.shadow = !this.shadow;
      setShadow = function(ball) {
        return ball.shadow = _this.shadow;
      };
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(setShadow(ball));
      }
      return _results;
    };

    BallApp.prototype.clearCanvas = function() {
      var ball, _i, _len, _ref;
      _ref = this.balls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        this.stage.removeSprite(ball);
      }
      return this.balls = [];
    };

    return BallApp;

  })(AppBase);

  window.BallApp = BallApp;

}).call(this);
