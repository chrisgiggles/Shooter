define(['Display', 'Game'],function(Display, Game){

    /*
    * In this file we create functions to be able to easily pass
    * around variables from classes that should only have one running instance.
    * */

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
        //Display
        getGfx: getGfx,
        getDisplayHeight: getDisplayHeight,
        getDisplayWidth: getDisplayWidth
        //Game
    };
});
