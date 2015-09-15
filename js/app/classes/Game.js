define(['Handler', 'Sprite', 'Events', 'Player'], function(Handler, Sprite, Events, Player) {

    var _running = false,
        _fps = 1 / 50;

    var definePlayer = {
        pos: {x: 320, y: 400},
        speed: 150,
        width: 30,
        height: 40,
        sprite: new Sprite({
            name: 'Hero',
            url: 'assets/dude_animation_sheet.png',
            width: 130,
            height: 130,
            state: {
                idle:[40,40],
                walk:[60,60],
                run:[70,70]
            }
        })
    };

    function Game() {
        this.graphics = Handler.getGfx();
        this.width = Handler.getDisplayWidth();
        this.height = Handler.getDisplayHeight();
        this.player = new Player(definePlayer);
    }

    Game.prototype = {
        init: function() {
            if(_running) return;
            //Else start the game
            _running = true;
            this.main();
        },

        main: function() {
            var self = this;
            function loop() {
                self.update( _fps );
                self.render( self.graphics );
                window.requestAnimationFrame( loop );
            }
            loop();
        },

        update: function( delta ) {
            this.player.update( delta );
        },

        render: function( gfx ) {
            //Clear the screen of previous renders
            gfx.clearRect(0,0,this.width, this.height);
            gfx.fillStyle = "#2b303b";
            gfx.fillRect(0,0,this.width, this.height);
            this.player.render(gfx);
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
