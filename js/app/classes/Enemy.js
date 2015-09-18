var Entity = require('./Entity.js');
var Handler = require('./Handler.js');

function Enemy(obj) {
	Entity.call(this, obj);
	this.player = Handler.EntityManager.getPlayer();
	this.enemy = Handler.EntityManager.setEnemy(this);
	this.moveTo = {x: this.pos.x, y: this.pos.y};
	this.slope = [0,0];
	this.init();
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function() {
	this.setCoordinate();
};

Enemy.prototype.setCoordinate = function() {
	this.moveTo.x = Math.floor(Math.random() * Handler.GlobalValues.display.width);
	this.moveTo.y = Math.floor(Math.random() * Handler.GlobalValues.display.height);
};

Enemy.prototype.move = function(delta) {
	var run = this.moveTo.x - this.pos.x;
	var rise = this.moveTo.y - this.pos.y;
	var length = Math.sqrt( (rise * rise) * (run * run) );
	this.slope[0] = run / length;
	this.slope[1] = rise / length;

}

Enemy.prototype.update = function(delta) {
	console.log(this.pos.x, this.moveTo.x, this.pos.y, this.moveTo.y);
	var run = this.moveTo.x - this.pos.x ;
	var rise = this.moveTo.y - this.pos.y;
	var length = Math.sqrt( (run * run) * (rise * rise));
	this.slope[0] = run / length;
	this.slope[1] = rise / length;
	this.pos.x += this.slope[0] * (this.speed);
	this.pos.y += this.slope[1] * (this.speed);

	//console.log(this.pos.x, this.moveTo[0], this.pos.y, this.moveTo[1]);


};

Enemy.prototype.render = function(gfx) {
	gfx.drawImage(this.sprite.div,0,86,this.sprite.width,this.sprite.height,this.pos.x,this.pos.y,this.width,this.height);
};

module.exports = Enemy;
