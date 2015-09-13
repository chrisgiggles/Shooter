define(['Entity', 'Input'], function(Entity, Input) {

    var _input = new Input(); // Put in a global handler

    function Player(obj) {
        Entity.call(this, obj);
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function(delta) {
        this.speed = 150 * delta;

        //Keyboard input
        var currentPos = {y: this.ypos, x: this.xpos};
        var pos = inputPosition(currentPos, this.speed);
        this.ypos = pos[0];
        this.xpos = pos[1];

        //Check bounds
        checkBounds.call(this);
    };

    Player.prototype.render = function() {
        //Move gfx here
    };

    function inputPosition(current, speed) {
        var stack = [current.y,current.x];

        if(_input.down) stack[0] += speed;
        if(_input.up) stack[0] += -speed;
        if(_input.right) stack[1] += speed;
        if(_input.left) stack[1] += -speed;

        return stack;
    }

    function checkBounds() {
        if(this.xpos <= 0) this.xpos = 0;
        if (this.xpos >= 640 - this.width) this.xpos = 640 - this.width;

        if (this.ypos <= 0) this.ypos = 0;
        if (this.ypos >= 640 - this.height) this.ypos = 640 - this.height;
    }

    return Player;
});