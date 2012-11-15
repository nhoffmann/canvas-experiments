(function() {
  var AppBase;

  AppBase = (function() {

    function AppBase(canvas) {
      console.log("Initiating new app");
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.setMetrics();
    }

    AppBase.prototype.draw = function() {
      return this.redraw();
    };

    AppBase.prototype.redraw = function() {
      this.clear();
      this.setMetrics();
      this.resizeCanvas();
      return this.drawContent();
    };

    AppBase.prototype.setMetrics = function() {
      this.fullWidth = window.innerWidth;
      this.fullHeight = window.innerHeight;
      this.halfWidth = this.fullWidth / 2;
      this.diagonal = Math.sqrt(this.fullWidth * this.fullWidth + this.fullHeight * this.fullHeight);
      this.center = {};
      this.center.x = this.fullWidth / 2;
      return this.center.y = this.fullHeight / 2;
    };

    AppBase.prototype.clear = function() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      return this.ctx.restore();
    };

    AppBase.prototype.resizeCanvas = function() {
      this.canvas.width = this.fullWidth;
      return this.canvas.height = this.fullHeight;
    };

    AppBase.prototype.drawContent = function() {
      return console.log("Not Implemented Yet");
    };

    AppBase.prototype.drawRect = function() {
      this.ctx.fillStyle = 'lightgrey';
      return this.ctx.fillRect(0, 0, this.fullWidth, this.fullHeight);
    };

    AppBase.prototype.drawCircle = function() {
      this.ctx.fillStyle = '#f00';
      this.ctx.beginPath();
      this.ctx.arc(this.center.x, this.center.y, 200, 0, Math.PI * 2, true);
      this.ctx.closePath();
      return this.ctx.fill();
    };

    AppBase.prototype.drawTest = function() {
      this.ctx.fillStyle = '#f00';
      this.ctx.font = 'italic bold 30px sans-serif';
      this.ctx.textBaseline = 'bottom';
      return this.ctx.fillText('This is full page canvas!', 50, 100);
    };

    return AppBase;

  })();

  window.AppBase = AppBase;

}).call(this);
