define(['Entity', 'Bullet', 'Input', 'Sprite'], function(Entity, Bullet, Input, Sprite) {

    var _input = new Input(); // Put in a global handler

    var velocity = {x: 0, y: 0};
    var acceleration = 20;
    var friction = 10;
    var maxSpeed = 180;

    var bullets = [];
    //Bullet logic, move out of this class
    var isFire = false;
    function loadBullet() {
        isFire = true;
        clearInterval(loadBullet);
    }

    var bulletOptions = {
        pos: {x: 0, y: 0},
        speed: 250,
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
        this.init();
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    //Bullet logic, move out of this class
    Player.prototype.init = function() {
        setInterval(loadBullet, 250);
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
            if(bullet.collides(self)) {
                console.log('friendly fire');
            }
        });

        //Check bounds
        checkBounds.call(this);
    };

    Player.prototype.render = function( gfx ) {
        //Create rectangle
        // console.log(this.sprite.state.idle);

        console.log(velocity);
        if(velocity.x > 0 && velocity.x < 120) {
            gfx.drawImage(this.sprite.div,142,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
        }
        else if(velocity.x >=120) {
            gfx.drawImage(this.sprite.div,192,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
        }
        else if(velocity.x < 0 && velocity.x > -120) {
            gfx.drawImage(this.sprite.div,46,0,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
        }
        else if(velocity.x <= -120) {
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
