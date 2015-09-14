define(['Entity'], function(Entity) {

    function Bullet(obj) {
        Entity.call(this, obj);
    }

    Bullet.prototype = Object.create(Entity.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.update = function(delta) {
        this.pos.y -= 200 * delta;
    };

    Bullet.prototype.render = function(gfx) {
        gfx.fillStyle = "#000000";
        gfx.fillRect(this.pos.x + 10, this.pos.y - 5, this.height, this.width);
    };

    return Bullet;
});