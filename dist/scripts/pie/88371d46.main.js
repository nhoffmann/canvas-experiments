(function() {
  var PieApp, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = null;

  jQuery(function() {
    var stage;
    stage = new Stage($('#canvas')[0]);
    app = new PieApp(stage);
    $(window).resize(function() {
      return stage.redraw();
    });
    $('#speed').on('change', function(event) {
      var value;
      value = $('#speed').val();
      return app.setRotationSpeed(value);
    });
    $('#pieceCount').on('change', function(event) {
      var value;
      value = $('#pieceCount').val();
      return app.setPieceCount(value);
    });
    $('#toggle').on('click', function(event) {
      if (app.isRotating) {
        return app.stopRotation();
      } else {
        return app.startRotation();
      }
    });
    $('#randomizeColors').on('click', function(event) {
      return app.shuffleColors();
    });
    return $('#partyMode').on('click', function(event) {
      return app.partyMode();
    });
  });

  PieApp = (function(_super) {

    __extends(PieApp, _super);

    PieApp.prototype.defaultSpeed = 0.001;

    function PieApp(stage) {
      PieApp.__super__.constructor.call(this, stage);
      this.pie = new Pie(this.stage.center.x, this.stage.center.y, this.stage.diagonal, 6, 0);
      this.stage.addSprite(this.pie);
      this.shuffleColors();
      this.startRotation();
    }

    PieApp.prototype.setRotationSpeed = function(newSpeed) {
      return this.rotationSpeed = this.defaultSpeed * newSpeed;
    };

    PieApp.prototype.setPieceCount = function(newCount) {
      return this.pie.pieceCount = Number(newCount);
    };

    PieApp.prototype.shuffleColors = function() {
      return this.pie.shuffleColors();
    };

    PieApp.prototype.partyMode = function() {
      this.setRotationSpeed(500);
      return this.partytime();
    };

    PieApp.prototype.partytime = function() {
      var _this = this;
      return this.stage.runloop.addEvent(new TimedRuntimeEvent(this, (function() {
        _this.randomizeProperties();
        return _this.partytime();
      }), Utils.randomInt(40)));
    };

    PieApp.prototype.randomizeProperties = function() {
      var threshold;
      threshold = Utils.randomInt(4);
      if (threshold > 0) {
        this.setPieceCount(Utils.randomIntFromRange(5, 20));
      }
      if (threshold > 1) {
        this.shuffleColors();
      }
      if (threshold > 2) {
        return this.setRotationSpeed(Utils.randomIntFromRange(-500, -400));
      }
    };

    PieApp.prototype.startRotation = function() {
      var _this = this;
      if (!this.isRotating) {
        this.rotation = new AnimationEvent(this, function() {
          return _this.pie.currentAngle += _this.rotationSpeed ? _this.rotationSpeed : _this.defaultSpeed;
        });
        this.stage.runloop.addEvent(this.rotation);
        return this.isRotating = true;
      }
    };

    PieApp.prototype.stopRotation = function() {
      if (this.isRotating) {
        this.stage.runloop.removeEvent(this.rotation);
        return this.isRotating = false;
      }
    };

    PieApp.prototype.drawContent = function() {
      var pieces;
      pieces = this.pieceColors.slice(0, this.pieceCount + 1 || 9e9);
      return this.pie.draw(this.ctx, this.center.x, this.center.y, this.diagonal, this.currentAngle, pieces);
    };

    return PieApp;

  })(AppBase);

  window.PieApp = PieApp;

}).call(this);
