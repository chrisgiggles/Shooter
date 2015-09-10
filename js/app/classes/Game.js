define(['Display', 'Input'], function(Display, Input) {

    var _display = new Display({width: 640, height: 480}),
        _running = false,
        _fps = 1 / 50,
        _input = new Input(); // Put in a global handler

    function Game() {
        this.graphics = _display.getGfx();
        this.width = _display.getWidth();
        this.height = _display.getHeight();
    }

    Game.prototype = {
        init: function() {
            if(_running) return;
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
                self.update( _fps );
                self.render();
                window.requestAnimationFrame( loop );
            }
            loop();
        },

        update: function( delta ) {
            var speed = delta * 175;
            //Testing keyboard input
            if(_input.down) {
                this.yPos += speed;
            }

            if(_input.up) {
                this.yPos -= speed;
            }

            if(_input.left) {
                this.xPos -= speed;
            }

            if(_input.right) {
                this.xPos += speed;
            }
        },

        render: function() {
            //Clear the screen of previous renders
            this.graphics.clearRect(0,0,this.width, this.height);
            //Create rectangle
            this.graphics.fillRect(this.xPos,this.yPos,28,40);
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

    return Game;

});