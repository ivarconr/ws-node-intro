const amqplib = require('amqplib');

var ex = 'chat';

var messages = require('./messages.json');
let currentMsg = 0;

function sendMessage(msg) {
    var open = amqplib.connect('amqp://172.17.0.1');
    open.then((conn) => conn.createChannel())
        .then((ch) => {
            ch.assertExchange(ex, 'fanout', {durable: false}).then((ok) => {
                let strMsg = JSON.stringify(msg);
                console.log(`sending message=${strMsg}`);
                ch.publish(ex, '', new Buffer(strMsg));
            })
        })
        .catch(console.warn);
}

setInterval(() => {
    sendMessage(messages[currentMsg]);
    currentMsg = (currentMsg + 1) % messages.length;
}, 1000);