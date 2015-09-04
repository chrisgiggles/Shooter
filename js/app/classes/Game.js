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
            if(_running) return; //Essentially do nothing
            //Else start the game
            _running = true;
            this.update();
        },

        xPos: 0,

        tick: function() {
            if(this.xPos >= 0 && this.xPos < this.width - 40) {
                this.xPos += 1;
            }
        },

        render: function() {
            console.log(this);
            this.graphics.clearRect(0,0,this.width, this.height);
            this.graphics.fillRect(this.xPos,0,40,40);
        },

        update: function() {
            var self = this;

            function loop() {
                self.tick();
                self.render();
                window.requestAnimationFrame(loop);
            }
            loop();
        }

    };

    return Game;

});