define(['Entity', 'Bullet', 'Input', 'Utils'], function(Entity, Bullet, Input, Utils) {

    var _input = new Input(); // Put in a global handler

    var velocity = {x: 0, y: 0};
    var acceleration = 10;
    var friction = 2;
    var maxSpeed = 160;

    var bullets = [];
    //Bullet logic, move out of this class
    var isFire = false;
    function loadBullet() {
        isFire = true;
        clearInterval(loadBullet);
    }

    var bulletOptions = {
        pos: {x: 0, y: 0},
        speed: 200,
        width: 6,
        height: 6,
        sprite: null
    };

    function Player(obj) {
        Entity.call(this, obj);
        this.init();
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    //Bullet logic, move out of this class
    Player.prototype.init = function() {
        setInterval(loadBullet, 150);
    };

    Player.prototype.update = function(delta) {

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
        });

        //Destroy bullets


        //Check bounds
        checkBounds.call(this);
    };

    Player.prototype.render = function( gfx ) {
        //Create rectangle
        gfx.fillStyle = "#e54d42";
        gfx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

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

        if(!_input.right && !_input.left)
        {
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

    return Player;
});