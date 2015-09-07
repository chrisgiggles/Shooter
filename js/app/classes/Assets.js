define(/*['SpriteSheet'],*/ function() {
    function Assets(spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.sprites = {};
        this.init();
    }

    Assets.prototype = {
        init: function() {
            //This will contain all game objects with a sprite
            //Initialized in a central location and used throughout the program
            this.sprites.playerIdle = this.spriteSheet.crop();
            this.sprites.playerRunningUp = this.spriteSheet.crop();
            this.sprites.playerRunningDown = this.spriteSheet.crop();
        }
    };

    return Assets;

    //Initialize in game.render(); ->
    //sprites = new Assets(spriteSheet);
    //Usage
    //sprites.playerIdle
});