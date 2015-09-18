
var Display = require('./Display.js');
var Player = require('./Player.js');
var Enemy = require('./Enemy.js');
var Sprite = require('./Sprite.js');

var _display = new Display({width: 640, height: 640});

var _running = false,
    _fps = 1 / 50;

var definePlayer = {
    pos: {x: 320, y: 400},
    speed: 150,
    width: 42,
    height: 54,
    sprite: new Sprite({
        width: 42,
        height: 54,
        state: {
            idle:[40,40],
            walk:[60,60],
            run:[70,70]
        }
    })
};

var defineEnemy = {
    pos: {x: 320, y: -50},
    speed: 100,
    width: 44,
    height: 46,
    sprite: new Sprite({
        width: 44,
        height: 46,
        state: {
            idle:[40,40]
        }
    })
};

function Game() {
    this.graphics = _display.getGfx();
    this.width = _display.getWidth();
    this.height = _display.getHeight();
    this.player = new Player(definePlayer);
    this.enemy = new Enemy(defineEnemy);
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
        this.enemy.update(delta);
    },

    render: function( gfx ) {
        //Clear the screen of previous renders
        gfx.clearRect(0,0,this.width, this.height);
        gfx.fillStyle = "#000000";
        gfx.fillRect(0,0,this.width, this.height);
        this.player.render(gfx);
        this.enemy.render(gfx);
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

module.exports = Game;
