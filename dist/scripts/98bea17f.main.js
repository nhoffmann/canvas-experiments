(function() {
  var AnimationEvent, AppBase, Runloop, RuntimeEvent, Sprite, Stage, TimedRuntimeEvent, Utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Utils = (function() {

    function Utils() {}

    Utils.randomIntFromRange = function(min, max, exceptArray) {
      var randomInt;
      randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      if ((exceptArray != null) && exceptArray.indexOf(randomInt) > 0) {
        return randomIntFromRange(min, max, exceptArray);
      } else {
        return randomInt;
      }
    };

    Utils.randomInt = function(x) {
      return this.randomIntFromRange(0, x);
    };

    Utils.randomIntBayesian = function(x) {
      return (this.randomInt(x) + this.randomInt(x)) / 2;
    };

    Utils.shuffleArray = function(array) {
      var durst, swap,
        _this = this;
      swap = function(input, x, y) {
        var _ref;
        return _ref = [input[y], input[x]], input[x] = _ref[0], input[y] = _ref[1], _ref;
      };
      durst = function(input) {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = _ref = input.length - 1; _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
          _results.push(swap(input, i, _this.randomInt(i)));
        }
        return _results;
      };
      return durst(array);
    };

    return Utils;

  })();

  window.Utils = Utils;

  Stage = (function() {

    Stage.prototype.width = 0;

    Stage.prototype.height = 0;

    Stage.prototype.sprites = [];

    function Stage(canvas, options) {
      console.log("Initiating Stage");
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.fullscreen = (options != null) && (options.fullscreen != null) ? options.fullscreen : true;
      console.log("Fullscreen", this.fullscreen);
      this._start();
    }

    Stage.prototype.redraw = function() {
      this._doSetMetrics();
      this._resizeCanvas();
      return this._redrawStage();
    };

    Stage.prototype.addSprite = function(sprite) {
      this.sprites.push(sprite);
      return sprite.setStage(this);
    };

    Stage.prototype.removeSprite = function(sprite) {
      return this.sprites.splice(this.sprites.indexOf(sprite), 1);
    };

    Stage.prototype._start = function() {
      this.redraw();
      return this._startRunloop();
    };

    Stage.prototype._startRunloop = function() {
      if (!window.LoooooooooP) {
        window.LoooooooooP = new Runloop(this, this._redrawStage);
        window.LoooooooooP.start();
      }
      return this.runloop = window.LoooooooooP;
    };

    Stage.prototype._redrawStage = function() {
      this._clear();
      return this._drawSprites();
    };

    Stage.prototype._drawSprites = function() {
      var drawSprite, sprite, _i, _len, _ref, _results,
        _this = this;
      drawSprite = function(sprite) {
        return sprite._doDraw();
      };
      _ref = this.sprites;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        _results.push(drawSprite(sprite));
      }
      return _results;
    };

    Stage.prototype._doSetMetrics = function() {
      this.fullWidth = this.fullscreen ? window.innerWidth : this.width;
      this.fullHeight = this.fullscreen ? window.innerHeight : this.height;
      this.halfWidth = this.fullWidth / 2;
      this.halfHeight = this.fullHeight / 2;
      this.diagonal = Math.sqrt(this.fullWidth * this.fullWidth + this.fullHeight * this.fullHeight);
      this.center = {};
      this.center.x = this.fullWidth / 2;
      return this.center.y = this.fullHeight / 2;
    };

    Stage.prototype._clear = function() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      return this.ctx.restore();
    };

    Stage.prototype._resizeCanvas = function() {
      this.canvas.width = this.fullWidth;
      return this.canvas.height = this.fullHeight;
    };

    return Stage;

  })();

  window.Stage = Stage;

  Sprite = (function() {

    function Sprite(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    Sprite.prototype.setStage = function(stage) {
      return this.stage = stage;
    };

    Sprite.prototype.draw = function(ctx) {
      return console.log("Not implemented yet");
    };

    Sprite.prototype._doDraw = function() {
      if (this.stage != null) {
        return this.draw(this.stage.ctx);
      } else {
        return console.log("Not Drawing. Sprite is not on a stage.");
      }
    };

    return Sprite;

  })();

  window.Sprite = Sprite;

  AppBase = (function() {

    function AppBase(stage) {
      if (stage == null) {
        throw "Could not create app. No stage given";
      }
      this.stage = stage;
    }

    AppBase.prototype.wireControls = function() {
      return console.log("Not Implemented Yet");
    };

    return AppBase;

  })();

  window.AppBase = AppBase;

  RuntimeEvent = (function() {

    RuntimeEvent.prototype.didRun = false;

    function RuntimeEvent(context, callback) {
      this.context = context;
      this.callback = callback;
    }

    RuntimeEvent.prototype.run = function() {
      this.callback.call(this.context, arguments);
      return this.didRun = true;
    };

    RuntimeEvent.prototype.destroyAfterRun = function() {
      return this.didRun && true;
    };

    return RuntimeEvent;

  })();

  window.RuntimeEvent = RuntimeEvent;

  TimedRuntimeEvent = (function(_super) {

    __extends(TimedRuntimeEvent, _super);

    TimedRuntimeEvent.prototype.wait = 0;

    function TimedRuntimeEvent(context, callback, wait) {
      this.wait = wait;
      TimedRuntimeEvent.__super__.constructor.call(this, context, callback);
    }

    TimedRuntimeEvent.prototype.run = function() {
      if (this.wait > 0) {
        return this.wait -= 1;
      } else {
        return TimedRuntimeEvent.__super__.run.call(this);
      }
    };

    return TimedRuntimeEvent;

  })(RuntimeEvent);

  window.TimedRuntimeEvent = TimedRuntimeEvent;

  AnimationEvent = (function(_super) {

    __extends(AnimationEvent, _super);

    function AnimationEvent() {
      return AnimationEvent.__super__.constructor.apply(this, arguments);
    }

    AnimationEvent.prototype.destroyAfterRun = function() {
      return false;
    };

    return AnimationEvent;

  })(RuntimeEvent);

  window.AnimationEvent = AnimationEvent;

  Runloop = (function() {

    Runloop.prototype.eventQueue = [];

    Runloop.prototype.isRunning = false;

    Runloop.prototype.animationFrameId = null;

    Runloop.prototype.callback = null;

    Runloop.prototype.runContext = null;

    function Runloop(runContext, callback) {
      this.runContext = runContext;
      this.callback = callback;
    }

    Runloop.prototype.start = function() {
      if (!this.isRunning) {
        this.runloop();
        return this.isRunning = true;
      }
    };

    Runloop.prototype.stop = function() {
      if (this.isRunning) {
        window.cancelAnimationFrame(this.animationFrameId);
        return this.isRunning = false;
      }
    };

    Runloop.prototype.runloop = function() {
      var event, run, staleEvent, staleEvents, _i, _j, _len, _len1, _ref,
        _this = this;
      staleEvents = [];
      run = function(event) {
        event.run();
        if (event.destroyAfterRun()) {
          return staleEvents.push(event);
        }
      };
      _ref = this.eventQueue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        run(event);
      }
      this.callback.call(this.runContext);
      for (_j = 0, _len1 = staleEvents.length; _j < _len1; _j++) {
        staleEvent = staleEvents[_j];
        this.removeEvent(staleEvent);
      }
      return this.animationFrameId = window.requestAnimationFrame(function() {
        return _this.runloop();
      });
    };

    Runloop.prototype.addEvent = function(event) {
      return this.eventQueue.push(event);
    };

    Runloop.prototype.removeEvent = function(event) {
      return this.eventQueue.splice(this.eventQueue.indexOf(event), 1);
    };

    return Runloop;

  })();

  window.Runloop = Runloop;

}).call(this);
