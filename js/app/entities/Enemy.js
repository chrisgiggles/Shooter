define(['Entity'], function(Entity) {

	console.log(Handler);

	function Enemy(obj) {
		Entity.call(this, obj)
	}

	Enemy.prototype = Object.create(Entity.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.update = function(delta) {}
	Enemy.prototype.render = function(gfx) {}

	return Enemy;

});