define(function() {
  function Sprite(spriteOptions) {
    // TODO  create base for sprite
    this.name = spriteOptions.name;
    this.url = spriteOptions.src;
    this.width = spriteOptions.sw;
    this.height = spriteOptions.sh;
    this.sprites = spriteOptions.sprites;

    this.init(spriteOptions);

    // this.draw();
  }
  Sprite.prototype = {
    init: function(spriteSetup) {
      // TODO  create div element for sprite
      var body = document.getElementsByTagName('body')[0];
      var spriteDiv = document.createElement('img');
      spriteDiv.setAttribute('id', this.name);
      spriteDiv.setAttribute('src', this.url);
      spriteDiv.setAttribute('style', 'display:none');

      body.appendChild(spriteDiv);
      this.div = spriteDiv;
      this.generateDrawSprite(spriteDiv);
    },
    generateDrawSprite: function(spriteObject) {
      // TODO
      return // drawImage(monkey.div, 0, 0, 135, 135, 20, 20, 80, 80);
    },
    log: function() {
      // console.log('log')
    },

  };

  return Sprite;

});
