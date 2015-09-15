define('Display', function(Display) {

    function GlobalHandler() {
        this.display = new Display();
    }

    GlobalHandler.prototype = {
        getGraphics: function() {
            return this.display.getGfx()
        }
    };

    return GlobalHandler;
});