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
        }
    };

    return Entity;
});