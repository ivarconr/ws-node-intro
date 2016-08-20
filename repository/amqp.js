
var uri = 'amqp://172.17.0.1';
var exchange = 'chat';
var queueName = 'userX'
const amqplib = require('amqplib')

module.exports = function(consumeMessage) {
     amqplib.connect(uri)
        .then(conn => conn.createChannel())
        .then(ch => {
            ch.assertExchange(exchange, 'fanout', {durable: false});
            ch.assertQueue(queueName)
                .then(q => {
                    console.log('queue connected.');
                    ch.bindQueue(q.queue, exchange, '');
                    ch.consume(q.queue, consumeMessage, {noAck: true});
                })
    });
}
