
jQuery( ->

  stage = new Stage($('#canvas')[0])
  app = new AnimatedBallsApp(stage)
  app.wireControls()


  $(window).resize(() ->
    stage.redraw()
  )
)

class AnimatedBallsApp extends BallApp

  animations: []

  constructor: (stage) ->
    super(stage)

    @speed = 1
    @shadow = false


  wireControls: ->
    $('#speed').on('change', (event) =>
      @speed = $('#speed').val()
    )
    $('#toggleShadow').on('click', (event) =>
      @toggleShadow()
    )
    $('#add').on('click', (event) =>
      @addRandomBall(@stage.halfHeight/4)
    )
    $('#clear').on('click', (event) =>
      @clearCanvas()

    )
    $('#toggle').on('click', (event) =>
      if @isRunning then @stop() else @start()
    )

    $('#horizontal').on('click', (event) =>
      speed = @speed

      @addAnimatedBall(@stage.halfHeight/4, () ->
        if @x < @stage.width
          @x += ((Number) speed)
        else
          @x -= ((Number) speed)
        console.log @x
      )
    )

    $('#vertical').on('click', (event) =>
      speed = @speed
      @addAnimatedBall(@stage.halfHeight/4, () ->
        if @y < @stage.width
          @y += ((Number) speed)
        else
          @y -= ((Number) speed)
        console.log @y
      )
    )

  addAnimatedBall: (radius, callback) ->
    ball = @addRandomBall(radius)
    animation = new AnimationEvent(ball, callback)
    @stage.runloop.addEvent(animation)
    @animations.push(animation)

