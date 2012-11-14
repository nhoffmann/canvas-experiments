class AppBase
  
  constructor: (canvas) ->
    console.log "Initiating new app"
    @canvas = canvas
    @ctx = @canvas.getContext("2d")
    
    @setMetrics()

  draw: ->
    @redraw()

  redraw: ->
    @clear()
    @setMetrics()
    @resizeCanvas()
    @drawContent()

  setMetrics: ->
    @fullWidth = window.innerWidth
    @fullHeight = window.innerHeight

    @halfWidth = @fullWidth/2

    @diagonal = Math.sqrt(@fullWidth * @fullWidth + @fullHeight * @fullHeight)

    @center = {}
    @center.x = @fullWidth/2
    @center.y = @fullHeight/2

  clear: ->
    # Store the current transformation matrix
    @ctx.save()

    # Use the identity matrix while clearing the canvas
    @ctx.setTransform(1, 0, 0, 1, 0, 0)
    @ctx.clearRect(0, 0, canvas.width, canvas.height)

    # Restore the transform
    @ctx.restore()

  resizeCanvas: ->
    @canvas.width  = @fullWidth
    @canvas.height = @fullHeight

  drawContent: ->
    console.log "Not Implemented Yet"

  drawRect: ->
    @ctx.fillStyle ='lightgrey'
    @ctx.fillRect(0, 0, @fullWidth, @fullHeight)

  drawCircle: ->
    @ctx.fillStyle = '#f00'
    @ctx.beginPath()
    @ctx.arc(@center.x, @center.y, 200,  0, Math.PI*2, true)
    @ctx.closePath()
    @ctx.fill()

  drawTest: ->
    @ctx.fillStyle = '#f00'
    @ctx.font = 'italic bold 30px sans-serif'
    @ctx.textBaseline = 'bottom'
    @ctx.fillText('This is full page canvas!', 50, 100)

window.AppBase = AppBase