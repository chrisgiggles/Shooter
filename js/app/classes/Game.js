define(['Display', 'Input', 'Sprite'], function(Display, Input, Sprite) {

  var _display = new Display({
      width: 640,
      height: 480
    }),
    _running = false,
    _fps = 1 / 50,
    _input = new Input(); // Put in a global handler

  var monkey = new Sprite({
    sx: 0,
    sy: 0,
    sw: 40,
    sh: 40,
    dx: 0,
    dy: 0,
    src: 'assets/dude_animation_sheet.png',
    name: 'hypemonkey',
    sprites: [{
      state: 'stand',
      dw: 40,
      dh: 40
    }, {
      state: 'walk',
      dw: 50,
      dh: 50
    }, {
      state: 'running',
      dw: 70,
      dh: 70
    }]
  });

  function Game() {
    this.graphics = _display.getGfx();
    this.width = _display.getWidth();
    this.height = _display.getHeight();
  }
  Game.prototype = {
    init: function() {
      if (_running) return;
      //Essentially do nothing for now
      //Replace with states

      //Else start the game
      _running = true;
      this.main();
    },

    xPos: 320, //Temporary variables
    yPos: 300, //Temp

    main: function() {
      var self = this;

      function loop() {
        self.update(_fps);
        self.render();
        window.requestAnimationFrame(loop);
      }
      loop();
    },

    update: function(delta) {
      var speed = delta * 175;
      //Testing keyboard input
      if (_input.down)  {
        this.yPos += speed;
      }

      if (_input.up)  {
        this.yPos -= speed;
      }

      if (_input.left)  {
        this.xPos -= speed;
      }

      if (_input.right)  {
        this.xPos += speed;
      }
    },

    render: function() {
      //Clear the screen of previous renders
      this.graphics.clearRect(0, 0, this.width, this.height);
      //Create rectangle
      this.graphics.fillRect(this.xPos, this.yPos, 28, 40);
      this.graphics.drawImage(monkey.div, 0, 0, 135, 135, 20, 20, 80, 80);
    },

    //Getter
    isRunning: function() {
      return _running;
    },

    //Setter
    toggleRunning: function() {
      _running = !_running; //Flip state between true/false
    }

  };

  function _setDelta() {
    if (!then) {
      var then = Date.now() - 1;
    }
    var now = Date.now();
    var delta = (now - then) / 1000;
    then = now;
    return delta;
  }

  return Game;

});
