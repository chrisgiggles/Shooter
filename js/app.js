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
  'baseUrl': 'js',
  'paths': {
    //Classes
    'Display': 'app/classes/Display',
    'Game': 'app/classes/Game',
    'Sprite': 'app/classes/Sprite',
    'Events': 'app/classes/Events',
    'Assets': 'app/classes/Assets',
    'Input': 'app/classes/Input',
    //Utilities
    'Utils': 'app/utils/utils'
  }
});

require(['app/main']);
