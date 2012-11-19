class Utils
  @randomIntFromRange: (min, max, exceptArray) ->
    randomInt = Math.floor(Math.random() * (max - min + 1)) + min

    if exceptArray? && exceptArray.indexOf(randomInt) > 0
      randomIntFromRange(min, max, exceptArray)
    else
      randomInt

  @randomInt: (x) ->
    @randomIntFromRange(0, x)

  @randomIntBayesian: (x) ->
    (@randomInt(x) + @randomInt(x)) / 2

  @shuffleArray: (array) ->
    swap  = (input, x,  y) -> [input[x], input[y]] = [input[y], input[x]]
    durst = (input) => swap(input, i, @randomInt(i)) for i in [input.length - 1 .. 1]

    durst(array)

window.Utils = Utils

class Stage

  width: 0
  height: 0

  sprites: []

  constructor: (canvas, options) ->
    console.log "Initiating Stage"
    @canvas = canvas
    @ctx = @canvas.getContext("2d")

    @fullscreen = if options? && options.fullscreen? then options.fullscreen else true

    console.log "Fullscreen", @fullscreen

    @_start()

  redraw: ->
    @_doSetMetrics()
    @_resizeCanvas()
    @_redrawStage()


  addSprite: (sprite) ->
    @sprites.push(sprite)
    sprite.setStage(@)

  removeSprite: (sprite) ->
    @sprites.splice(@sprites.indexOf(sprite), 1)

  _start: ->
    @redraw()
    @_startRunloop()

  # start the global loop
  _startRunloop: ->
    unless window.LoooooooooP
      window.LoooooooooP = new Runloop(@, @_redrawStage)
      window.LoooooooooP.start()
    @runloop = window.LoooooooooP

  _redrawStage: ->
    @_clear()
    @_drawSprites()

  _drawSprites: ->
    drawSprite = (sprite) =>
      sprite._doDraw()

    drawSprite(sprite) for sprite in @sprites

  _doSetMetrics: ->
    @fullWidth = if @fullscreen then window.innerWidth else @width
    @fullHeight = if @fullscreen then window.innerHeight else @height

    @halfWidth = @fullWidth/2
    @halfHeight = @fullHeight/2

    @diagonal = Math.sqrt(@fullWidth * @fullWidth + @fullHeight * @fullHeight)

    @center = {}
    @center.x = @fullWidth/2
    @center.y = @fullHeight/2

  _clear: ->
    # Store the current transformation matrix
    @ctx.save()

    # Use the identity matrix while clearing the canvas
    @ctx.setTransform(1, 0, 0, 1, 0, 0)
    @ctx.clearRect(0, 0, canvas.width, canvas.height)

    # Restore the transform
    @ctx.restore()

  _resizeCanvas: ->
    @canvas.width  = @fullWidth
    @canvas.height = @fullHeight

window.Stage = Stage

class Sprite
  constructor: (x, y, width, height) ->
    @x = x
    @y = y
    @width = width
    @height = height

  setStage: (stage) ->
    @stage = stage

  draw: (ctx) ->
    console.log "Not implemented yet"

  _doDraw: ->
    if @stage?
      @draw(@stage.ctx)
    else
      console.log "Not Drawing. Sprite is not on a stage."

window.Sprite = Sprite

class AppBase

  constructor: (stage) ->
    throw "Could not create app. No stage given" unless stage?
    @stage = stage

  wireControls: ->
    console.log "Not Implemented Yet"

window.AppBase = AppBase

# Onetime Event that should get executed in the next runtime cycle when pushed to
# the events queue
class RuntimeEvent
  didRun: false
  constructor: (context, callback) ->
    @context = context
    @callback = callback

  run: ->
    @callback.call(@context, arguments)
    @didRun = true

  destroyAfterRun: ->
    @didRun && true

window.RuntimeEvent = RuntimeEvent


# OnetimeEvent that will get executed in @wait number of frames
class TimedRuntimeEvent extends RuntimeEvent
  # number of frames defaults to 0 so that the TimedRuntimeEvent behaves like
  # a RuntimeEvent when wait is ommited
  wait: 0

  constructor: (context, callback, wait) ->
    @wait = wait
    super(context, callback)

  run: ->
    if @wait > 0
      @wait -= 1
    else
      super()

window.TimedRuntimeEvent = TimedRuntimeEvent

class AnimationEvent extends RuntimeEvent

  destroyAfterRun: ->
    false
  # TODO
  # some garbage collection: Maybe implement a check if the
  # animated item is still visible on canvas and remove the animation otherwise
  # probably implement that in the object itself
  #
  # isOffCanvas: (canvasWidth, canvasHeight) ->
  #   "Not implemented yet"

  #TODO
  # maybe overwrite the run method to always call a redraw() on the @context

window.AnimationEvent = AnimationEvent

class Runloop
  eventQueue: []
  isRunning: false
  animationFrameId: null
  callback: null
  runContext: null

  constructor: (runContext, callback) ->
    @runContext = runContext
    @callback = callback

  start: ->
    unless @isRunning
      @runloop()
      @isRunning = true

  stop: ->
    if @isRunning
      window.cancelAnimationFrame(@animationFrameId)
      @isRunning = false

  runloop: ->
    staleEvents = []
    run = (event) =>
      event.run()
      if event.destroyAfterRun()
        staleEvents.push(event)
    run(event) for event in @eventQueue

    @callback.call(@runContext)

    @removeEvent(staleEvent) for staleEvent in staleEvents

    # the actual loop
    @animationFrameId = window.requestAnimationFrame(() =>
      @runloop()
    )

  addEvent: (event) ->
    @eventQueue.push(event)

  removeEvent: (event) ->
    @eventQueue.splice(@eventQueue.indexOf(event), 1)

window.Runloop = Runloop
