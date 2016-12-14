'use strict';

const { EventEmitter } = require('events');

const pubsub = new EventEmitter();

pubsub.on('some-event-name', (arg1) => {
    console.log(`got "${arg1}" from some-event-navn`);
});

pubsub.once('some-event-name', (arg1) => {
    console.log(`got once "${arg1}" from some-event-navn`);
});

pubsub.emit('some-event-name', 1);
pubsub.emit('some-event-name', 2);
pubsub.emit('some-event-name', 3);


