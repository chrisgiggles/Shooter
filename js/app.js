/*
* Det här är vår konfigurationsfil för requirejs.
* Om man vill kunna ladda in ett skript som finns i js/libs/foo.js
* lägger man till det i paths-objektet
* Eftersom vi definierar /js/ som vår baseUrl så behöver vi enbart skriva:
*
* 'paths': {
*   'foo': 'libs/foo'
* }
*
* */
requirejs.config({
    'baseUrl': 'js/app',
    'paths': {
        //General Classes
        'Display': 'classes/Display',
        'GlobalHandler': 'classes/GlobalHandler',
        'Game': 'classes/Game',
        'Events': 'classes/Events',
        'Sprite': 'classes/Sprite',
        'Input': 'classes/Input',
        //Entity classes
        'Entity': 'entities/Entity',
        'Player': 'entities/Player',
        'Bullet': 'entities/Bullet',
        //Utilities
        'Utils': 'utils/utils'
    }
});

require(['main']);
