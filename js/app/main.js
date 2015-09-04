require(['Display'], function(Display) {

    var graphics;

    var display = new Display({
        width: 640,
        height: 640
    });

    graphics = display.getGfx();

    graphics.fillRect(0,0,40,40);
});

