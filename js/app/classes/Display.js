define(function() {

    //Private variables
    var _width,
        _height,
        _ctx;

    function Display(displayOptions) {
        //Set variables
        _width = displayOptions.width;
        _height = displayOptions.height;
        //Run init in constructor
        this.init();
    }

    Display.prototype = {
        init: function() {
            //Add Canvas with specified dimensions and context to the body
            var body = document.getElementsByTagName('body')[0];
            var canvas = document.createElement('canvas');
            canvas.setAttribute( 'width', this.getWidth() );
            canvas.setAttribute( 'height', this.getHeight() );
            body.appendChild(canvas);

            //Add the context to the the constructor
            _ctx = canvas.getContext('2d');
        },

        //GETTERS
        getWidth: function() {
            return _width;
        },

        getHeight: function() {
            return _height;
        },

        getGfx: function() {
           if(_ctx != null) {
               return _ctx;
           }
           else {
               throw "Cannot return graphics.";
           }
        }
    };

    return Display;

});