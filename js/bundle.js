(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var main = require("./app/main.js");

},{"./app/main.js":13}],2:[function(require,module,exports){
var Entity = require('./Entity.js');

function Bullet(obj) {
    Entity.call(this, obj);
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(delta) {
    this.pos.y -= this.speed * delta;
};

Bullet.prototype.render = function(gfx) {
    gfx.drawImage(this.sprite.div,27,60,this.sprite.width,this.sprite.height,this.pos.x + 0,this.pos.y - 20,this.width,this.height);
    gfx.drawImage(this.sprite.div,27,60,this.sprite.width,this.sprite.height,this.pos.x + 34,this.pos.y - 20,this.width,this.height);
};

module.exports = Bullet;

},{"./Entity.js":5}],3:[function(require,module,exports){
var Handler = require('./Handler.js');

//Set global values
Handler.GlobalValues.display = {};

//Private variables
var _width,
    _height,
    _ctx;

function Display(displayOptions) {
    //Set variables
    _width = displayOptions.width;
    _height = displayOptions.height;
    //Run init in constructor
    this.init();
}

Display.prototype = {
    init: function() {
        //Add Canvas with specified dimensions and context to the body
        var body = document.getElementsByTagName('body')[0];
        var canvas = document.createElement('canvas');
        canvas.setAttribute( 'width', this.getWidth() );
        canvas.setAttribute( 'height', this.getHeight() );
        body.appendChild(canvas);

        Handler.GlobalValues.display = { width: this.getWidth(), height: this.getHeight() };
        //Add the context to the the constructor
        _ctx = canvas.getContext('2d');
    },

    //GETTERS
    getWidth: function() {
        return _width;
    },

    getHeight: function() {
        return _height;
    },

    getGfx: function() {
        if(_ctx != null) {
            return _ctx;
        }
        else {
            throw "Cannot return graphics.";
        }
    }
};

module.exports = Display;

},{"./Handler.js":9}],4:[function(require,module,exports){
var Entity = require('./Entity.js');
var Handler = require('./Handler.js');

function Enemy(obj) {
	Entity.call(this, obj);
	this.player = Handler.EntityManager.getPlayer();
	this.enemy = Handler.EntityManager.setEnemy(this);
	this.moveTo = {x: this.pos.x, y: this.pos.y};
	this.slope = [0,0];
	this.init();
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function() {
	this.setCoordinate();
};

Enemy.prototype.setCoordinate = function() {
	this.moveTo.x = Math.floor(Math.random() * Handler.GlobalValues.display.width);
	this.moveTo.y = Math.floor(Math.random() * Handler.GlobalValues.display.height);
};

Enemy.prototype.move = function(delta) {
	var run = this.moveTo.x - this.pos.x;
	var rise = this.moveTo.y - this.pos.y;
	var length = Math.sqrt( (rise * rise) * (run * run) );
	this.slope[0] = run / length;
	this.slope[1] = rise / length;

}

Enemy.prototype.update = function(delta) {
	console.log(this.pos.x, this.moveTo.x, this.pos.y, this.moveTo.y);
	var run = this.moveTo.x - this.pos.x ;
	var rise = this.moveTo.y - this.pos.y;
	var length = Math.sqrt( (run * run) * (rise * rise));
	this.slope[0] = run / length;
	this.slope[1] = rise / length;
	this.pos.x += this.slope[0] * (this.speed);
	this.pos.y += this.slope[1] * (this.speed);

	//console.log(this.pos.x, this.moveTo[0], this.pos.y, this.moveTo[1]);


};

Enemy.prototype.render = function(gfx) {
	gfx.drawImage(this.sprite.div,0,86,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
};

module.exports = Enemy;

},{"./Entity.js":5,"./Handler.js":9}],5:[function(require,module,exports){
function Entity(obj) {
    this.pos = {
        x: obj.pos.x,
        y: obj.pos.y
    };
    this.speed = obj.speed;
    this.width = obj.width;
    this.height = obj.height;
    this.sprite = obj.sprite;
}

Entity.prototype = {
    update: function( delta ) {
        //console.log('updating')
    },

    render: function() {
       //console.log('rendering')
    },

    collides: function(obstacle) {
        return this.pos.x < obstacle.pos.x + obstacle.width &&
                this.pos.x + this.width > obstacle.pos.x &&
                this.pos.y < obstacle.pos.y + obstacle.height &&
                this.pos.y + this.height > obstacle.pos.y;
    }
};

module.exports = Entity;

},{}],6:[function(require,module,exports){
var Handler = require('./Handler.js');

function EntityManager() {
    this.arena = {}
}

EntityManager.prototype = {
    setPlayer: function(player) {
        this.arena.player = player;
    },

    getPlayer: function() {
        return this.arena.player
    },

    setEnemy: function(enemy) {
        this.arena.enemies = this.arena.enemies || [];
        this.arena.enemies.push(enemy);
        console.log(this.arena);
    }
}

module.exports = EntityManager;

},{"./Handler.js":9}],7:[function(require,module,exports){
var _eventList;

function Events() {
    _eventList = {};
}

Events.prototype = {
    on: function(eventName, fn) {
        _eventList[eventName] = _eventList[eventName] || [];
        _eventList[eventName].push(fn);
        console.log(_eventList);
    },

    off: function(eventName, fn) {
        if ( _eventList[eventName] ) {
            return false;
        }

        for (var i = 0; i < _eventList[eventName].length; i++) {
            if ( _eventList[eventName][i] === fn ) {
                _eventList[eventName].splice(i, 1);
                console.log(_eventList);
            }
        }
    },

    trigger: function(eventName, arg) {
        console.log(_eventList[eventName][0]);
        if ( !_eventList[eventName] ) {
            return false;
        }

        _eventList[eventName].forEach(function(fn) {
            return fn(arg);
        });
    }
};

module.exports = Events;

},{}],8:[function(require,module,exports){
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

},{"./Display.js":3,"./Enemy.js":4,"./Player.js":11,"./Sprite.js":12}],9:[function(require,module,exports){
var EntityManager = require('./EntityManager.js');
var Events = require('./Events.js');

exports.GlobalValues = {};
exports.EntityManager = new EntityManager();
exports.Events = new Events();

},{"./EntityManager.js":6,"./Events.js":7}],10:[function(require,module,exports){
function Input() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.shoot = false;

    this.registerEvents();
}

Input.prototype = {
    registerEvents: function() {
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        window.addEventListener('keyup', this.keyUp.bind(this), false);
    },

    findKey: function(e) {
        for( var prop in keyMap ) {
            if ( keyMap.hasOwnProperty(prop) ) {
                if ( keyMap[prop] === e.which ) {
                    return prop;
                }
            }
        }
    },

    keyDown: function(e) {
        var prop = this.findKey(e);
        if (prop) {
            this[prop] = true;
        }
    },

    keyUp: function(e) {
        var prop = this.findKey(e);
        if (prop) {
            this[prop] = false;
        }
    }
};

var keyMap = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    shoot: 90
};

module.exports = Input;

},{}],11:[function(require,module,exports){
var Entity = require('./Entity.js');
var Handler = require('./Handler.js');
var Input = require('./Input.js');
var Sprite = require('./Sprite.js');
var Bullet = require('./Bullet.js');

var _input = new Input(); // Put in a global handler
var handler = Handler;

var velocity = {x: 0, y: 0};
var acceleration = 30;
var friction = 10;
var maxSpeed = 200;

var bullets = [];
//Bullet logic, move out of this class
var isFire = false;
function loadBullet() {
    isFire = true;
    clearInterval(loadBullet);
}

var bulletOptions = {
    pos: {x: 0, y: 0},
    speed: 300,
    width: 8,
    height: 22,
    sprite: new Sprite({
        name: 'Bullet',
        url: 'assets/sprites.png',
        width: 8,
        height: 22,
        state: {
            idle:[40,40]
        }
    })
};

function Player(obj) {
    Entity.call(this, obj);
    handler.EntityManager.setPlayer(this);
    this.init();
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

//Bullet logic, move out of this class
Player.prototype.init = function() {
    setInterval(loadBullet, 250);
    // window.events.on('getPlayer', function() {
    //     return self;
    // });
};

Player.prototype.update = function(delta) {
    var self = this;
    //Keyboard input
    calculateVelocity();
    this.pos.y += velocity.y * delta;
    this.pos.x += velocity.x * delta;

    //Fire bullets
    if(_input.shoot && isFire) {
        isFire = false;
        shoot(this.pos.x, this.pos.y);
    }

    bullets.forEach(function(bullet, i, arr) {
        bullet.update(delta);
        //If outside bounds, splice self out of list
        if(bullet.pos.y === 0) {
            arr.splice(i, 1);
        }
        if(self.collides(bullet)) {
            console.log('friendly fire');
        }
    });

    //Check bounds
    checkBounds.call(this);
};

Player.prototype.render = function( gfx ) {
    //Create rectangle
    // console.log(this.sprite.state.idle);

    if(velocity.x > 0 && velocity.x < 100) {
        gfx.drawImage(this.sprite.div,142,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
    }
    else if(velocity.x >=100) {
        gfx.drawImage(this.sprite.div,192,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
    }
    else if(velocity.x < 0 && velocity.x > -100) {
        gfx.drawImage(this.sprite.div,46,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
    }
    else if(velocity.x <= -100) {
        gfx.drawImage(this.sprite.div,0,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
    }
    else {
        gfx.drawImage(this.sprite.div,94,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
    }

    bullets.forEach(function(bullet) {
        bullet.render( gfx );
    });
};

function shoot(x, y) {
    bulletOptions.pos.x = x;
    bulletOptions.pos.y = y;
    bullets.push(new Bullet(bulletOptions));
}

function calculateVelocity() {
    if(_input.down) {
        velocity.y += acceleration;
        if (velocity.y > maxSpeed) {
            velocity.y = maxSpeed;
        }
    }

    if(_input.up) {
        velocity.y -= acceleration;
        if (velocity.y < -maxSpeed) {
            velocity.y = -maxSpeed;
        }
    }

    if(!_input.up && !_input.down) {
        if(velocity.y < 0) {
            velocity.y += friction;
            if(velocity.y >= 0) {
                velocity.y = 0;
            }
        }
        else {
            velocity.y -= friction;
            if(velocity.y <= 0 ) {
                velocity.y = 0;
            }
        }

    }

    if(_input.right) {
        velocity.x += acceleration;
        if (velocity.x > maxSpeed) {
            velocity.x = maxSpeed;
        }
    }
    if(_input.left) {
        velocity.x -= acceleration;
        if (velocity.x < -maxSpeed) {
            velocity.x = -maxSpeed;
        }
    }

    if(!_input.right && !_input.left) {
        if(velocity.x < 0) {
            velocity.x += friction;
            if(velocity.x >= 0) {
                velocity.x = 0;
            }
        }
        else {
            velocity.x -= friction;
            if(velocity.x <= 0 ) {
                velocity.x = 0;
            }
        }
    }
}

function checkBounds() {
    if(this.pos.x <= 0) this.pos.x = 0;
    if (this.pos.x >= 640 - this.width) this.pos.x = 640 - this.width;

    if (this.pos.y <= 0) this.pos.y = 0;
    if (this.pos.y >= 640 - this.height) this.pos.y = 640 - this.height;
}

module.exports = Player;

},{"./Bullet.js":2,"./Entity.js":5,"./Handler.js":9,"./Input.js":10,"./Sprite.js":12}],12:[function(require,module,exports){
function Sprite(spriteOptions) {
    // TODO  create base for sprite
    this.url = spriteOptions.url;
    this.width = spriteOptions.width;
    this.height = spriteOptions.height;
    this.state = spriteOptions.state;
    this.url = 'assets/sprites.png'
    this.init(spriteOptions);

    // this.draw();
}
Sprite.prototype = {
    init: function(spriteSetup) {
        // TODO  create div element for sprite
        var body = document.getElementsByTagName('body')[0];
        var imageDiv = document.createElement('img');
        imageDiv.setAttribute('src', this.url);
        imageDiv.setAttribute('style', 'display:none');
        body.appendChild(imageDiv);
        this.div = imageDiv;
        console.log(this);
        // this.generateDrawSprite(spriteDiv);
    },
    generateDrawSprite: function(spriteObject) {
        // TODO
        return; // drawImage(monkey.div, 0, 0, 135, 135, 20, 20, 80, 80);
    },
    log: function() {
        // console.log('log')
    },

};

module.exports = Sprite;

},{}],13:[function(require,module,exports){
var Game = require('./classes/Game.js');

var game = new Game();
game.init();

},{"./classes/Game.js":8}]},{},[1]);
