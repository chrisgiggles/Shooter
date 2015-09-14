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
        'Game': 'classes/Game',
        'Events': 'classes/Events',
        'Assets': 'classes/Assets',
        'Input': 'classes/Input',
        //Entity classes
        'Entity': 'entities/Entity',
        'Player': 'entities/Player',
        //Utilities
        'Utils': 'utils/utils'
    }
});

require(['main']);