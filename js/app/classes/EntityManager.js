var Handler = require('./Handler.js');

function EntityManager() {
    this.arena = {}
}

EntityManager.prototype = {
    setPlayer: function(player) {
        this.arena.player = player;
    },

    getPlayer: function() {
        return this.arena.player
    },

    setEnemy: function(enemy) {
        this.arena.enemies = this.arena.enemies || [];
        this.arena.enemies.push(enemy);
        console.log(this.arena);
    }
}

module.exports = EntityManager;
