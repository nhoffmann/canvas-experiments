app = null

jQuery( ->
  app = new BallApp($('#canvas')[0])
  # app.addSingleBall(0, 0, 200)

  $(window).resize(() ->
    app.redraw()
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
    app.addRandomBall()
  )
)

class BallApp extends AppBase

  constructor: (canvas) ->
    super(canvas)

    @scaleFactor = 1
    @shadow = false

    @balls = []
    @draw()

  clearCanvas: ->
    @balls = []
    @clear()

  addBall: (x, y, radius) ->
    @balls.push(new Ball(x, y, radius))
    @redraw()

  addRandomBall: ->
    x = (Math.random() * @fullWidth + Math.random() * @fullWidth) / 2
    y = (Math.random() * @fullHeight + Math.random() * @fullHeight) / 2
    radius = (Math.random() * @halfWidth/2 + Math.random() * @halfWidth/2) /2
    @addBall(x, y, radius)

  setScaleFactor: (newScaleFactor) ->
    @scaleFactor = newScaleFactor
    $.each(@balls, (index, item) =>
      item.setScaleFactor(@scaleFactor)
    )
    @redraw()

  toggleShadow: ->
    @shadow = not @shadow
    $.each(@balls, (index, item) =>
      item.setShadow(@shadow)
      false
    )
    @redraw()

  drawContent: ->
    $.each(@balls, (index, item) =>
      item.draw(@ctx)
    )

