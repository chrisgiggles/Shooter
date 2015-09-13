define(["Display"], function(Display) {

    function Entity(obj) {
        this.xpos = obj.xpos;
        this.ypos = obj.ypos;
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