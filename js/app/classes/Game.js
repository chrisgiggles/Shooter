define(['Display', 'Sprite', 'Events', 'Player'], function( Display, Sprite, Events, Player) {

    var _display = new Display({width: 640, height: 640}),
        _running = false,
        _fps = 1 / 50;

    var definePlayer = {
        pos: {x: 320, y: 400},
        speed: 150,
        width: 30,
        height: 40,
        sprite: new Sprite({
          name: 'Hero',
          url: 'assets/dude_animation_sheet.png',
          width:130,
          height:130,
          state:{
            // TODO function för att pendla mellan crop värden
            idle:[40,40],
            walk:[60,60],
            run:[70,70]
          },
        })
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
