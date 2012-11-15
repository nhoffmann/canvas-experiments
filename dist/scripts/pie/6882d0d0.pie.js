(function() {
  var Pie, PieceOfCake;

  Pie = (function() {

    function Pie() {}

    Pie.prototype.draw = function(ctx, x, y, radius, initialAngle, pieces) {
      var arcSize, endAngle, startAngle,
        _this = this;
      arcSize = Math.PI * 2 / pieces.length;
      startAngle = initialAngle;
      endAngle = arcSize + initialAngle;
      return $.each(pieces, function(index, item) {
        var pieceOfCake;
        pieceOfCake = new PieceOfCake(item, x, y, radius, startAngle, endAngle);
        pieceOfCake.draw(ctx);
        startAngle += arcSize;
        return endAngle += arcSize;
      });
    };

    return Pie;

  })();

  window.Pie = Pie;

  PieceOfCake = (function() {

    function PieceOfCake(piece, x, y, radius, startAngle, endAngle) {
      this.piece = piece;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
    }

    PieceOfCake.prototype.draw = function(ctx) {
      ctx.save();
      ctx.fillStyle = this.piece;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
      ctx.closePath();
      ctx.fill();
      return ctx.restore();
    };

    return PieceOfCake;

  })();

  window.PieceOfCake = PieceOfCake;

}).call(this);
