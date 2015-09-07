require(['Game'], function(Game) {
    var game = new Game();
    game.start();
});

/*

Usage of ImageLoad and SpriteSheet Classes:

var image;
function ImageLoad(path) {
    image = new Image();
    image.src = path;
}

ImageLoad.prototype = {
    crop: function() {

    }
};

var marioSheet = new SpriteSheet('url');
marioSheet.running;

marioSheet = {
    idle: [{
        crop: x & y
        size: 40
    }],
    running: [

    ]
};

marioImage = new ImageLoad(url);
marioSprite.idle = new Sprite(marioImage, crop, size);
marioSprite.running = new Sprite(marioImage, crop, size);

 //Assets class

 function Assets(spriteSheet) {
 this.spriteSheet = spriteSheet;
 this.sprites = {};
 this.init();
 }

 Assets.prototype = {
 init: function() {
 this.sprites.player = this.spriteSheet.crop();
 }
 };

 //In game.render(); ->
 sprites = new Assets(spriteSheet);
*/
