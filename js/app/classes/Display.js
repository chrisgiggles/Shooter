define(function() {

    function Display(displayOptions) {
        this.width = displayOptions.width;
        this.height = displayOptions.height;
        this.ctx = null;

        this.init();
    }

    Display.prototype = {
        init: function() {
            //Add Canvas with specified dimensions and context to the body
            var body = document.getElementsByTagName('body')[0];
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', this.width);
            canvas.setAttribute('height', this.height);
            body.appendChild(canvas);

            //Add the context to the the constructor
            this.ctx = canvas.getContext('2d');
        },

        getWidth: function() {
            return this.width;
        },

        getHeight: function() {
            return this.height;
        },

        //Checks if canvas context has been properly initialized and returns it
        //Safer than just assigning gfx = this.ctx;
        getGfx: function() {
           if(this.ctx != null) {
               return this.ctx;
           }
           else {
               throw "Cannot return graphic. Check the Display.init() function";
           }
        }
    };

    return Display;

});