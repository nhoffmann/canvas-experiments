(function() {
  var Pie,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pie = (function(_super) {

    __extends(Pie, _super);

    function Pie(x, y, radius, pieceCount, startAngle) {
      Pie.__super__.constructor.call(this, x, y);
      this.radius = radius;
      this.pieceCount = pieceCount;
      this.initialAngle = startAngle;
      this.currentAngle = this.initialAngle;
      this.pieces = window.htmlColors;
    }

    Pie.prototype.shuffleColors = function() {
      return Utils.shuffleArray(this.pieces);
    };

    Pie.prototype.draw = function(ctx) {
      var arcSize, drawPiece, endAngle, piece, startAngle, _i, _len, _ref, _results,
        _this = this;
      arcSize = Math.PI * 2 / this.pieceCount;
      startAngle = this.currentAngle;
      endAngle = arcSize + this.currentAngle;
      drawPiece = function(piece) {
        ctx.save();
        ctx.fillStyle = piece;
        ctx.beginPath();
        ctx.moveTo(_this.x, _this.y);
        ctx.arc(_this.x, _this.y, _this.radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        startAngle += arcSize;
        return endAngle += arcSize;
      };
      _ref = this.pieces.slice(0, this.pieceCount + 1 || 9e9);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        _results.push(drawPiece(piece));
      }
      return _results;
    };

    return Pie;

  })(Sprite);

  window.Pie = Pie;

}).call(this);
