class Pie extends Sprite

  constructor: (x, y, radius, pieceCount, startAngle) ->
    super(x, y)
    @radius = radius
    @pieceCount = pieceCount
    @initialAngle = startAngle
    @currentAngle = @initialAngle
    @pieces = window.htmlColors

  shuffleColors: ->
    Utils.shuffleArray(@pieces)

  draw: (ctx) ->
    #console.log "Drawing pie"
    # TODO every piece has to brings its own arc size
    arcSize = Math.PI * 2 / @pieceCount

    startAngle = @currentAngle
    endAngle = arcSize + @currentAngle

    drawPiece = (piece) =>
      ctx.save()

      ctx.fillStyle = piece
      ctx.beginPath()

      ctx.moveTo(@x, @y)
      ctx.arc(@x, @y, @radius, startAngle, endAngle, false)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      startAngle += arcSize
      endAngle += arcSize

    drawPiece(piece) for piece in @pieces[0 .. @pieceCount]

window.Pie = Pie

