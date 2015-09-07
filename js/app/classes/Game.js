define(['Display'], function(Display) {

    var _display = new Display({width: 640, height: 480}),
        _running = false;

    function Game() {
        this.graphics = _display.getGfx();
        this.width = _display.getWidth();
        this.height = _display.getHeight();
    }

    Game.prototype = {
        start: function() {
            if(_running) return;
            //Essentially do nothing for now
            //Replace with states

            //Else start the game
            _running = true;
            this.main();
        },

        xPos: 0, //Temporary variable
        yPos: 0,

        update: function( delta ) {
            var distance = delta * 800;
            console.log(distance);
            //Testing update of xPos
            if( this.xPos >= 0 && this.xPos < this.width - 40 ) {
                this.xPos += distance;
            }
        },

        main: function() {
            var self = this;
            function loop() {
                var delta = _setDelta();
                self.update( delta );
                self.render();
                window.requestAnimationFrame( loop );
            }
            loop();
        },


        render: function() {
            console.log(this);
            //Clear the screen of previous renders
            this.graphics.clearRect(0,0,this.width, this.height);
            //Create rectangle
            this.graphics.fillRect(this.xPos,0,40,40);
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
        if(!then) {
            var then = Date.now() - 1;
        }
        var now = Date.now();
        var delta = (now - then) / 1000;
        then = now;
        return delta;
    }

    return Game;

});