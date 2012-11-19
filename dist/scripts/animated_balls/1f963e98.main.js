(function() {
  var AnimatedBallsApp,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var app, stage;
    stage = new Stage($('#canvas')[0]);
    app = new AnimatedBallsApp(stage);
    app.wireControls();
    return $(window).resize(function() {
      return stage.redraw();
    });
  });

  AnimatedBallsApp = (function(_super) {

    __extends(AnimatedBallsApp, _super);

    AnimatedBallsApp.prototype.animations = [];

    function AnimatedBallsApp(stage) {
      AnimatedBallsApp.__super__.constructor.call(this, stage);
      this.speed = 1;
      this.shadow = false;
    }

    AnimatedBallsApp.prototype.wireControls = function() {
      var _this = this;
      $('#speed').on('change', function(event) {
        return _this.speed = $('#speed').val();
      });
      $('#toggleShadow').on('click', function(event) {
        return _this.toggleShadow();
      });
      $('#add').on('click', function(event) {
        return _this.addRandomBall(_this.stage.halfHeight / 4);
      });
      $('#clear').on('click', function(event) {
        return _this.clearCanvas();
      });
      $('#toggle').on('click', function(event) {
        if (_this.isRunning) {
          return _this.stop();
        } else {
          return _this.start();
        }
      });
      $('#horizontal').on('click', function(event) {
        var speed;
        speed = _this.speed;
        return _this.addAnimatedBall(_this.stage.halfHeight / 4, function() {
          if (this.x < this.stage.width) {
            this.x += Number(speed);
          } else {
            this.x -= Number(speed);
          }
          return console.log(this.x);
        });
      });
      return $('#vertical').on('click', function(event) {
        var speed;
        speed = _this.speed;
        return _this.addAnimatedBall(_this.stage.halfHeight / 4, function() {
          if (this.y < this.stage.width) {
            this.y += Number(speed);
          } else {
            this.y -= Number(speed);
          }
          return console.log(this.y);
        });
      });
    };

    AnimatedBallsApp.prototype.addAnimatedBall = function(radius, callback) {
      var animation, ball;
      ball = this.addRandomBall(radius);
      animation = new AnimationEvent(ball, callback);
      this.stage.runloop.addEvent(animation);
      return this.animations.push(animation);
    };

    return AnimatedBallsApp;

  })(BallApp);

}).call(this);
