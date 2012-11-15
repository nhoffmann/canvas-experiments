(function() {
  var PieApp, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = null;

  jQuery(function() {
    console.log("Loading application");
    app = new PieApp($('#canvas')[0]);
    $(window).resize(function() {
      return app.redraw();
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
    return $('#randomizeColors').on('click', function(event) {
      return app.shuffleColors();
    });
  });

  PieApp = (function(_super) {

    __extends(PieApp, _super);

    function PieApp(canvas) {
      PieApp.__super__.constructor.call(this, canvas);
      this.pie = new Pie();
      this.pieceColors = window.htmlColors;
      this.currentAngle = 0;
      this.pieceCount = 3;
      this.draw();
      this.startRotation();
    }

    PieApp.prototype.setRotationSpeed = function(newSpeed) {
      return this.rotationSpeed = 0.001 * newSpeed;
    };

    PieApp.prototype.setPieceCount = function(newCount) {
      this.pieceCount = Number(newCount);
      return this.redraw();
    };

    PieApp.prototype.shuffleColors = function() {
      var durst, rand, swap;
      swap = function(input, x, y) {
        var _ref;
        return _ref = [input[y], input[x]], input[x] = _ref[0], input[y] = _ref[1], _ref;
      };
      rand = function(x) {
        return Math.floor(Math.random() * x);
      };
      durst = function(input) {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = _ref = input.length - 1; _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
          _results.push(swap(input, i, rand(i)));
        }
        return _results;
      };
      durst(this.pieceColors);
      return this.redraw();
    };

    PieApp.prototype.startRotation = function() {
      if (!this.isRotating) {
        this.animationFrameId = window.requestAnimationFrame(this.animate);
        return this.isRotating = true;
      }
    };

    PieApp.prototype.animate = function() {
      app.currentAngle += app.rotationSpeed ? app.rotationSpeed : 0.001;
      app.redraw();
      return app.animationFrameId = window.requestAnimationFrame(app.animate);
    };

    PieApp.prototype.stopRotation = function() {
      if (this.isRotating) {
        window.cancelAnimationFrame(this.animationFrameId);
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
