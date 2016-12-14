'use strict';

const { queue } = require('../../../../helpers');

module.exports = (cache, config, userName) => {
    let q = queue(config.amqpUri, `my-chat-${userName}`)
        .on('connected', () => console.log(`connected to queue ${userName}`))
        .on('message', message => cache.pushTo(userName, message))
        .on('error', console.error);

    return {
        getMessages () {
            return Promise.resolve(cache.get(userName) || []);
        },
        sendMessage (name, message) {
            return q.sendMessage(name, message);
        },
        onMessage (cb) {
            return q.on('message', cb);
        },
        stop () {
            if (!q) {
                return;
            }
            q.removeAllListeners();
            return q.stop().then(() => {
                q = null;
            });
        },
    };
};
