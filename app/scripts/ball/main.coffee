app = null

jQuery( ->
  stage = new Stage($('#canvas')[0])
  app = new BallApp(stage)

  $(window).resize(() ->
    stage.redraw()
  )

  $('#scaleFactor').on('change', (event) ->
    value = $('#scaleFactor').val()
    app.setScaleFactor(value)
  )

  $('#clear').on('click', (event) ->
    app.clearCanvas()
  )

  $('#toggleShadow').on('click', (event) ->
    app.toggleShadow()
  )

  $('#addBall').on('click', (event) ->
    app.addRandomBall(Utils.randomIntBayesian(stage.halfWidth))
  )
)

class BallApp extends AppBase

  balls: []

  constructor: (stage) ->
    super(stage)

    @scaleFactor = 1
    @shadow = false

  addBall: (x, y, radius) ->
    ball = new Ball(x, y, radius, @scaleFactor)
    @stage.addSprite(ball)
    @balls.push(ball)
    ball

  addRandomBall: (radius) ->
    x = Utils.randomIntBayesian(@stage.fullWidth)
    y = Utils.randomIntBayesian(@stage.fullHeight)
    @addBall(x, y, radius)

  setScaleFactor: (newScaleFactor) ->
    @scaleFactor = newScaleFactor

    setFactor = (ball) =>
      ball.scaleFactor = @scaleFactor

    setFactor(ball) for ball in @balls

  toggleShadow: ->
    @shadow = not @shadow
    setShadow = (ball) =>
      ball.shadow = @shadow

    setShadow(ball) for ball in @balls


  clearCanvas: ->
    @stage.removeSprite(ball) for ball in @balls
    @balls = []

window.BallApp = BallApp
