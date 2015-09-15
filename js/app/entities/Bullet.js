define(['Entity'], function(Entity) {

    function Bullet(obj) {
        Entity.call(this, obj);
    }

    Bullet.prototype = Object.create(Entity.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.update = function(delta) {
        this.pos.y -= this.speed * delta;
    };

    Bullet.prototype.render = function(gfx) {
        gfx.fillStyle = "#88ce02";
        gfx.fillRect(this.pos.x, this.pos.y - 5, this.height, this.width);
        gfx.fillRect(this.pos.x + 15, this.pos.y - 5, this.height, this.width);
    };

    return Bullet;
});