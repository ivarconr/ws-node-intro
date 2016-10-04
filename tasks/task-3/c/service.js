const queue = require('../../../helpers/queue');

module.exports = (config, name) => {
    const messages = [];

    const q = queue(config.amqpUri, `my-chat-${name}`)
        .on('connected', () => console.log('connected to queue'))
        .on('message', message => messages.push(message))
        .on('error', console.error);

    return {
        getMessages () { return Promise.resolve(messages); },
        sendMessage (name, message) { return q.sendMessage(name, message) },
        onMessage (cb) { return q.on('message', cb)  }
    };
};