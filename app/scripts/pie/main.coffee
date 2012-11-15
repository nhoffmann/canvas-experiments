app = null

jQuery( ->
  console.log "Loading application"
  app = new PieApp($('#canvas')[0])

  $(window).resize(() ->
    app.redraw()
  )

  $('#speed').on('change', (event) ->
    value = $('#speed').val()
    app.setRotationSpeed(value)
  )

  $('#pieceCount').on('change', (event) ->
    value = $('#pieceCount').val()
    app.setPieceCount(value)
  )

  $('#toggle').on('click', (event) ->
    if app.isRotating
      app.stopRotation()
    else
      app.startRotation()
  )

  $('#randomizeColors').on('click', (event) ->
    app.shuffleColors()
  )
)

class PieApp extends AppBase
  

  constructor: (canvas) ->
    super(canvas)

    @pie = new Pie()
    @pieceColors = window.htmlColors
    @currentAngle = 0
    @pieceCount = 3
    
    @draw()
    @startRotation()

  setRotationSpeed: (newSpeed) ->
    @rotationSpeed = 0.001 * newSpeed

  setPieceCount: (newCount) ->
    @pieceCount = (Number) newCount
    @redraw()

  shuffleColors: ->
    swap  = (input, x,  y) -> [input[x], input[y]] = [input[y], input[x]]
    rand  = (x) -> Math.floor(Math.random() * x)
    durst = (input) -> swap(input, i, rand(i)) for i in [input.length - 1 .. 1]
    durst(@pieceColors)
    @redraw()

  startRotation: ->
    unless @isRotating
      @animationFrameId = window.requestAnimationFrame(@animate)
      @isRotating = true

  animate: ->
    app.currentAngle += if app.rotationSpeed then app.rotationSpeed else 0.001
    app.redraw()

    app.animationFrameId = window.requestAnimationFrame(app.animate)

  stopRotation: ->
    if @isRotating
      window.cancelAnimationFrame(@animationFrameId)
      @isRotating = false

  drawContent: ->
    pieces = @pieceColors[0..@pieceCount]
    @pie.draw(@ctx, @center.x, @center.y, @diagonal, @currentAngle, pieces)

window.PieApp = PieApp
