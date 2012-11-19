app = null

jQuery( ->
  stage = new Stage($('#canvas')[0])
  app = new PieApp(stage)

  $(window).resize(() ->
    stage.redraw()
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

  $('#partyMode').on('click', (event) ->
    app.partyMode()
  )

)

class PieApp extends AppBase

  defaultSpeed: 0.001

  constructor: (stage) ->
    super(stage)

    @pie = new Pie(@stage.center.x, @stage.center.y, @stage.diagonal, 6, 0)
    @stage.addSprite(@pie)

    @shuffleColors()
    @startRotation()

  setRotationSpeed: (newSpeed) ->
    @rotationSpeed = @defaultSpeed * newSpeed

  setPieceCount: (newCount) ->
    @pie.pieceCount = ((Number) newCount )

  shuffleColors: ->
    @pie.shuffleColors()

  partyMode: ->
    @setRotationSpeed(500)
    @partytime()

  partytime: ->
    @stage.runloop.addEvent(new TimedRuntimeEvent(@, (() =>
      @randomizeProperties()
      @partytime()
    ), Utils.randomInt(40)))

  randomizeProperties: ->
    threshold = Utils.randomInt(4)

    if threshold > 0
      @setPieceCount(Utils.randomIntFromRange(5, 20))
    if threshold > 1
      @shuffleColors()
    if threshold > 2
      @setRotationSpeed(Utils.randomIntFromRange(-500, -400))


  startRotation: ->
    unless @isRotating
      @rotation = new AnimationEvent(@, () =>
        @pie.currentAngle += if @rotationSpeed then @rotationSpeed else @defaultSpeed
      )
      @stage.runloop.addEvent(@rotation)
      @isRotating = true


  stopRotation: ->
    if @isRotating
      @stage.runloop.removeEvent(@rotation)
      @isRotating = false

  drawContent: ->
    pieces = @pieceColors[0..@pieceCount]
    @pie.draw(@ctx, @center.x, @center.y, @diagonal, @currentAngle, pieces)


window.PieApp = PieApp
