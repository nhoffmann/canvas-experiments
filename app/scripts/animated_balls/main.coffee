app = null

jQuery( ->
  app = new AnimatedBallsApp($('#canvas')[0])

  $(window).resize(() ->
    app.redraw()
  )
)

class AnimatedBallsApp extends AppBase

  animationFrameId: null

  constructor: (canvas) ->
    super(canvas)

    @speed = 1
    @shadow = false

    @balls = []
    @draw()

  wireControls: ->
    $('#speed').on('change', (event) =>
      @speed = $('#speed').val()
    )
    $('#toggleShadow').on('click', (event) =>
      @toggleShadow()
    )
    $('#add').on('click', (event) =>
      @addRandomBall(@halfHeight/4)
    )
    $('#clear').on('click', (event) =>
      @clearCanvas()
    )
    $('#toggle').on('click', (event) =>
      if @isRunning then @stop() else @start()
    )
    $('#horizontal').on('click', (event) =>
      animation = {
        run: (subject, ctx)->
          subject.x += subject.speed
          subject.draw(ctx)
      }
      @addAnimation(animation)
    )
    $('#vertical').on('click', (event) =>
      animation = {
        run: (subject, ctx)->
          subject.y += subject.speed
          subject.draw(ctx)
      }
      @addAnimation(animation)
    )

  clearCanvas: ->
    @balls = []
    @clear()

  addBall: (x, y, radius) ->
    @balls.push(new Ball(x, y, radius))
    @redraw()

  addRandomBall: (radius) ->
    x = (Math.random() * @fullWidth + Math.random() * @fullWidth) / 2
    y = (Math.random() * @fullHeight + Math.random() * @fullHeight) / 2
    radius = if radius? then radius else (Math.random() * @halfWidth/2 + Math.random() * @halfWidth/2) /2
    @addBall(x, y, radius)

  toggleShadow: ->
    @shadow = not @shadow
    $.each(@balls, (index, item) =>
      item.setShadow(@shadow)
      false
    )
    @redraw()

  addAnimation: (animation) ->
    $.each(@balls, (index, item) ->
      item.addAnimation(animation)
      false
    )
    @redraw()

  drawContent: ->
    $.each(@balls, (index, item) =>
      item.draw(@ctx)
    )


  start: ->
    unless @isRunning
      @runloop()
      @isRunning = true

  runloop: ->
    $.each(@balls, (index, item) =>
      if item.isOfffCanvas(@fullWidth, @fullHeight)
        @balls.pop(item)
        delete item
      else
        item.run(@ctx)
    )
    @redraw()

    @animationFrameId = window.requestAnimationFrame(() =>
      @runloop()
    )

  stop: ->
    if @isRunning
      window.cancelAnimationFrame(@animationFrameId)
      @isRunning = false

