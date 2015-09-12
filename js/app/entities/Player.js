define(['Entity'], function(Entity) {

    function Player() {
        Entity.call(this)

    }
    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.add = function(x,y){return x+y};

    return Player;
});