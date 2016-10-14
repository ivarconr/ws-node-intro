'use strict';
const createService = require('./service');

module.exports = function (cache, config) {
    return function perUserConntection (ws) {
        let service;
        let userName;

        function handleMessage (message) {
            const payload = JSON.parse(message);
            if (payload.type === 'username') {
                userName = String(payload.value);
                if (!userName) {
                    return;
                }

                if (!service) {
                    console.log('User identified:', userName);
                    service = createService(cache, config, userName);
                    service.onMessage(msg => {
                        // websockets might have disconnected, `ws.send` will throw
                        try {
                            ws.send(JSON.stringify(Object.assign({ type: 'message' }, msg)));
                        } catch (e) {}
                    });
                }

                service.getMessages().then(messages => ws.send(JSON.stringify({ type: 'init', messages })));
            }

            if (!service || !userName) {
                return;
            }

            if (payload.type === 'send-message') {
                return service.sendMessage(userName, payload.value);
            }
        }

        ws.on('message', (message) => {
            try {
                handleMessage(message);
            } catch (e) {
                console.warn(e);
            }
        });

        ws.on('close', () => {
            if (service) {
                service.stop();
                service = null;
            }
        });
    };
};
