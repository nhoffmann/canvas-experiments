class Ball extends Sprite
  constructor: (x, y, radius, scaleFactor) ->
    super(x + radius, y + radius, radius * 2, radius * 2)
    @radius = radius

    @scaleFactor = scaleFactor
    @shadow = false

  draw: (ctx) ->
    scaledRadius = @radius * @scaleFactor

    ctx.save()

    gradient = ctx.createRadialGradient(@x, @y, scaledRadius / 2, @x, @y, scaledRadius * 2)
    gradient.addColorStop(0, '#fff')
    gradient.addColorStop(0.9, 'rgb(162, 192, 255)')

    ctx.fillStyle = gradient

    ctx.beginPath()

    ctx.arc(@x, @y, scaledRadius, 0, Math.PI * 2, false)
    ctx.closePath()

    if @shadow
      ctx.shadowColor= "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = scaledRadius / 2
      ctx.shadowOffsetX = scaledRadius / 10
      ctx.shadowOffsetY = scaledRadius / 10

    ctx.fill()

    ctx.restore()



# class Ball

#   animations: []

#   constructor: (x, y, radius) ->
#     @x = x
#     @y = y
#     @radius = radius
#     @speed = 1
#     @scaleFactor = 1
#     @shadow = false

#   setScaleFactor: (newScaleFactor) ->
#     @scaleFactor = newScaleFactor

#   setSpeed: (newSpeed) ->
#     @speed = newSpeed

#   setShadow: (shadow) ->
#     @shadow = shadow

#   draw: (ctx) ->
#     scaledRadius = @radius * @scaleFactor

#     ctx.beginPath()
#     ctx.arc(@x, @y, scaledRadius, 0, Math.PI*2, true)
#     ctx.closePath()

#     gradient = ctx.createRadialGradient(@x, @y, scaledRadius / 2, @x, @y, scaledRadius * 2)
#     gradient.addColorStop(0, '#fff')
#     gradient.addColorStop(0.9, 'rgb(162, 192, 255)')

#     ctx.fillStyle = gradient
#     if @shadow
#       ctx.shadowColor= "rgba(0, 0, 0, 0.5)"
#       ctx.shadowBlur = scaledRadius / 2
#       ctx.shadowOffsetX = scaledRadius / 10
#       ctx.shadowOffsetY = scaledRadius / 10
#     ctx.fill()

#   run: (ctx) ->
#     console.log @animations.length
#     if @animations?
#       animation.run(@, ctx) for animation in @animations

#   addAnimation: (animation) ->
#     animation.subject = @
#     @animations.push animation

#   clearAnimations: ->
#     @animations = []

window.Ball = Ball
