var _eventList;

function Events() {
    _eventList = {};
}

Events.prototype = {
    on: function(eventName, fn) {
        _eventList[eventName] = _eventList[eventName] || [];
        _eventList[eventName].push(fn);
        console.log(_eventList);
    },

    off: function(eventName, fn) {
        if ( _eventList[eventName] ) {
            return false;
        }

        for (var i = 0; i < _eventList[eventName].length; i++) {
            if ( _eventList[eventName][i] === fn ) {
                _eventList[eventName].splice(i, 1);
                console.log(_eventList);
            }
        }
    },

    trigger: function(eventName, arg) {
        console.log(_eventList[eventName][0]);
        if ( !_eventList[eventName] ) {
            return false;
        }

        _eventList[eventName].forEach(function(fn) {
            return fn(arg);
        });
    }
};

module.exports = Events;
