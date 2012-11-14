class Ball

  constructor: (x, y, radius) ->
    @x = x
    @y = y
    @radius = radius
    @scaleFactor = 1
    @shadow = false

  setScaleFactor: (newScaleFactor) ->
    @scaleFactor = newScaleFactor

  setShadow: (shadow) ->
    @shadow = shadow

  draw: (ctx) ->
    scaledRadius = @radius * @scaleFactor

    ctx.beginPath()
    ctx.arc(@x, @y, scaledRadius, 0, Math.PI*2, true)
    ctx.closePath()
    
    gradient = ctx.createRadialGradient(@x, @y, scaledRadius / 2, @x, @y, scaledRadius * 2)
    gradient.addColorStop(0, '#fff')
    gradient.addColorStop(0.9, 'rgb(162, 192, 255)')

    ctx.fillStyle = gradient
    if @shadow
      ctx.shadowColor= "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = scaledRadius / 2
      ctx.shadowOffsetX = scaledRadius / 10
      ctx.shadowOffsetY = scaledRadius / 10
    ctx.fill()

window.Ball = Ball