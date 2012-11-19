(function() {
  var Box, BoxesApp,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    var app, stage;
    stage = new Stage($('#canvas')[0]);
    app = new BoxesApp(stage);
    app.wireControls();
    return $(window).resize(function() {
      return stage.redraw();
    });
  });

  BoxesApp = (function(_super) {

    __extends(BoxesApp, _super);

    function BoxesApp(stage) {
      BoxesApp.__super__.constructor.call(this, stage);
      this.nextBoxX = 0;
      this.nextBoxY = 0;
    }

    BoxesApp.prototype.wireControls = function() {
      var _this = this;
      return $('#addBoxes').on('click', function() {
        return _this.addBoxes(Utils.randomIntFromRange(50, 100));
      });
    };

    BoxesApp.prototype.addBoxes = function(sideLength) {
      var _this = this;
      return this.stage.runloop.addEvent(new TimedRuntimeEvent(this, (function() {
        _this.addBoxRow(sideLength);
        return _this.addBoxes(sideLength);
      }), 1));
    };

    BoxesApp.prototype.addBoxRow = function(sideLength) {
      var box;
      if (!this.pageFull()) {
        box = new Box(this.nextBoxX, this.nextBoxY, sideLength, sideLength, window.htmlColors[Utils.randomInt(window.htmlColors.length)]);
        this.stage.addSprite(box);
        this.nextBoxX += sideLength;
        if (this.rowFull()) {
          this.nextBoxX = 0;
          return this.nextBoxY += sideLength;
        }
      }
    };

    BoxesApp.prototype.rowFull = function() {
      return this.nextBoxX > this.stage.fullWidth;
    };

    BoxesApp.prototype.pageFull = function() {
      return this.nextBoxY > this.stage.fullHeight;
    };

    return BoxesApp;

  })(AppBase);

  window.BoxesApp = BoxesApp;

  Box = (function(_super) {

    __extends(Box, _super);

    function Box(x, y, width, height, color) {
      Box.__super__.constructor.call(this, x, y, width, height);
      this.color = color;
    }

    Box.prototype.draw = function(ctx) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.closePath();
      ctx.fill();
      return ctx.restore();
    };

    return Box;

  })(Sprite);

  window.Box = Box;

}).call(this);
