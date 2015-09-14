define(['Entity', 'Input'], function(Entity, Input) {

    var _input = new Input(); // Put in a global handler

    var velocity = {x: 0, y: 0};
    var acceleration = 15;
    var friction = 3;
    var maxSpeed = 150;

    function Player(obj) {
        Entity.call(this, obj);
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function(delta) {

        //Keyboard input
        inputPosition();
        this.pos.y += velocity.y * delta;
        this.pos.x += velocity.x * delta;
        //this.pos.x += velocity;

        //console.log(this.pos.y)
        //Check bounds
        checkBounds.call(this);
    };

    Player.prototype.render = function() {
        //Move gfx here
    };

    function inputPosition() {
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

        if(!_input.up || !_input.down) {
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

        if(!_input.right || !_input.left)
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