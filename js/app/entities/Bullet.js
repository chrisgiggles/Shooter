define(['Entity'], function(Entity) {
    function Bullet(obj) {
        Entity.call(this, obj);
    }

    Bullet.prototype = Object.create(Entity.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.update = function(delta)  {
        this.pos.y -= this.speed * delta;
    };

    Bullet.prototype.render = function(gfx)  {
        gfx.drawImage(this.sprite.div, 27, 60, this.sprite.width, this.sprite.height, this.pos.x + 0, this.pos.y - 20, this.width, this.height);
        gfx.drawImage(this.sprite.div, 27, 60, this.sprite.width, this.sprite.height, this.pos.x + 34, this.pos.y - 20, this.width, this.height);
    };

    return Bullet;
});
