
function Sprite(spriteOptions) {
    // TODO  create base for sprite
    this.url = spriteOptions.url;
    this.width = spriteOptions.width;
    this.height = spriteOptions.height;
    this.state = spriteOptions.state;
    this.url = 'assets/sprites.png'
    this.init(spriteOptions);

    // this.draw();
}
Sprite.prototype = {
    init: function(spriteSetup) {
        // TODO  create div element for sprite
        var body = document.getElementsByTagName('body')[0];
        var imageDiv = document.createElement('img');
        imageDiv.setAttribute('src', this.url);
        imageDiv.setAttribute('style', 'display:none');
        body.appendChild(imageDiv);
        this.div = imageDiv;
        console.log(this);
        // this.generateDrawSprite(spriteDiv);
    },
    generateDrawSprite: function(spriteObject) {
        // TODO
        return; // drawImage(monkey.div, 0, 0, 135, 135, 20, 20, 80, 80);
    },
    log: function() {
        // console.log('log')
    },

};

module.exports = Sprite;
