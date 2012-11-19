jQuery( ->
  stage = new Stage($('#canvas')[0])
  app = new BoxesApp(stage)
  app.wireControls()

  $(window).resize(() ->
    stage.redraw()
  )
)

class BoxesApp extends AppBase
  constructor: (stage) ->
    super(stage)

    @nextBoxX = 0
    @nextBoxY = 0

  wireControls: ->
    $('#addBoxes').on('click', () =>
      @addBoxes(Utils.randomIntFromRange(50, 100))
    )

  addBoxes: (sideLength) ->
    @stage.runloop.addEvent(new TimedRuntimeEvent(@, (() =>
      @addBoxRow(sideLength)
      @addBoxes(sideLength)
    ), 1))

  addBoxRow: (sideLength) ->
    unless @pageFull()
      box = new Box(@nextBoxX, @nextBoxY, sideLength, sideLength, window.htmlColors[Utils.randomInt(window.htmlColors.length)])
      @stage.addSprite(box)
      @nextBoxX += sideLength
      if @rowFull()
        @nextBoxX = 0
        @nextBoxY += sideLength

  rowFull: () ->
    @nextBoxX > @stage.fullWidth

  pageFull: () ->
    @nextBoxY > @stage.fullHeight


window.BoxesApp = BoxesApp

class Box extends Sprite

  constructor: (x, y, width, height, color) ->
    super(x, y, width, height)
    @color = color

  draw: (ctx) ->
    ctx.save()

    ctx.fillStyle = @color

    ctx.beginPath()

    ctx.rect(@x, @y, @width, @height)
    ctx.closePath()

    ctx.fill()

    ctx.restore()

window.Box = Box
