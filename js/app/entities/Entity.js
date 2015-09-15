define(function() {

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
    return Entity;
});