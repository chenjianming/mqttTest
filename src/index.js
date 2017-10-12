'use strict';

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://45.125.12.43:61613',{
    username:'admin',
    password:'password'
});
$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
    client.on('connect', function () {
        client.subscribe('presence');
        client.subscribe('switch');
        client.subscribe('irr');
        client.publish('presence', 'Hello Ruff! Apollo');
    });

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log('topic:', topic);
        console.log('message:', message.toString());
        if (topic==='switch'){
            if (message.toString() === 'on'){
                $('#led-r').turnOn();
            }else if (message.toString() === 'off'){
                $('#led-r').turnOff();
            }
        }
    });
    $('#irr').on('data', function(data) {
        client.publish('irr', data.toString());
    });

});

$.end(function () {
    $('#led-r').turnOff();

    client.end();
});
