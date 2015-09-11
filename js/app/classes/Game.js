define(['Display', 'Input', 'Events', 'Player'], function(Display, Input, Events, Player) {

    var _display = new Display({width: 640, height: 640}),
        _running = false,
        _fps = 1 / 50,
        _input = new Input(), // Put in a global handler
        _events = new Events();

    function Game() {
        this.graphics = _display.getGfx();
        this.width = _display.getWidth();
        this.height = _display.getHeight();
        this.player = new Player();
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
        bulletX: 0,
        bulletY: 0,

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
            var speed = delta * 145;
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

            if(_input.shoot) {
                this.bulletX = this.xPos;
                this.bulletY = speed;
            }

            this.player.update( delta );
        },

        render: function() {
            //Clear the screen of previous renders
            this.graphics.clearRect(0,0,this.width, this.height);
            //Create rectangle
            this.graphics.fillStyle = "#2B303B";
            this.graphics.fillRect(this.xPos,this.yPos,28,40);
            if(_input.shoot) {
                this.graphics.fillStyle = "#E54D42";
                this.graphics.fillRect(this.bulletX + 11, this.bulletY, 50, 50);
            }
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