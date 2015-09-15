define(['Display', 'Game'],function(Display, Game){

    //Graphics
    var _display = new Display({width: 640, height: 640});

    function getGfx() {
        return _display.getGfx();
    }

    function getDisplayHeight() {
        return _display.getHeight();
    }

    function getDisplayWidth() {
        return _display.getWidth();
    }

    //Game

    return {
        getGfx: getGfx,
        getDisplayHeight: getDisplayHeight,
        getDisplayWidth: getDisplayWidth
    };
});