define(function() {

    function Entity() {}

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