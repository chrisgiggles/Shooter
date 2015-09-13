define(['Display', 'Events', 'Player'], function(Display, Events, Player) {

    var _display = new Display({width: 640, height: 640}),
        _running = false,
        _fps = 1 / 50;

    var definePlayer = {
        xpos: 320,
        ypos: 400,
        speed: 150,
        width: 25,
        height: 40,
        sprite: null
    };

    function Game() {
        this.graphics = _display.getGfx();
        this.width = _display.getWidth();
        this.height = _display.getHeight();
        this.player = new Player(definePlayer);
    }

    Game.prototype = {
        init: function() {
            if(_running) return;
            //Else start the game
            _running = true;
            console.log(this.player);
            this.main();
        },

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
            this.player.update( delta );
        },

        render: function() {
            //Clear the screen of previous renders
            this.graphics.clearRect(0,0,this.width, this.height);
            //Create rectangle
            this.graphics.fillStyle = "#2B303B";
            this.graphics.fillRect(this.player.xpos, this.player.ypos,this.player.width,this.player.height);
            this.player.render();
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