class Pie

  animationFrameId: null

  draw: (ctx, x, y, radius, initialAngle, pieces) ->
    # TODO every piece has to brings its own arc size
    arcSize = Math.PI * 2 / pieces.length
    
    startAngle = initialAngle
    endAngle = arcSize + initialAngle

    $.each(pieces, (index, item) =>
      
      pieceOfCake = new PieceOfCake(item, x, y, radius, startAngle, endAngle)
      pieceOfCake.draw(ctx)
      
      startAngle += arcSize
      endAngle += arcSize
    )

window.Pie = Pie

class PieceOfCake

  constructor: (piece, x, y, radius, startAngle, endAngle)->
    @piece = piece
    @x = x
    @y = y
    @radius = radius
    @startAngle = startAngle
    @endAngle = endAngle

  draw: (ctx) ->
    ctx.save()

    ctx.fillStyle = @piece
    ctx.beginPath()

    ctx.moveTo(@x, @y)
    ctx.arc(@x, @y, @radius, @startAngle, @endAngle, false)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

window.PieceOfCake = PieceOfCake