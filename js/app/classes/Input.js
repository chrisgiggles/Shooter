function Input() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.shoot = false;

    this.registerEvents();
}

Input.prototype = {
    registerEvents: function() {
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        window.addEventListener('keyup', this.keyUp.bind(this), false);
    },

    findKey: function(e) {
        for( var prop in keyMap ) {
            if ( keyMap.hasOwnProperty(prop) ) {
                if ( keyMap[prop] === e.which ) {
                    return prop;
                }
            }
        }
    },

    keyDown: function(e) {
        var prop = this.findKey(e);
        if (prop) {
            this[prop] = true;
        }
    },

    keyUp: function(e) {
        var prop = this.findKey(e);
        if (prop) {
            this[prop] = false;
        }
    }
};

var keyMap = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    shoot: 90
};

module.exports = Input;
