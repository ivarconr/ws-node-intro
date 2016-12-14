window.tasks('Task 3', {
    title: 'Task 3',
    description: 'Create a chat webapp',
    children: [
        {
            title: '1 Collecting messages',
            description: 'Make a module that wraps [queue module](https://www.npmjs.com/package/finn-workshop-helpers) (from the chat client you used in task 1.)',
            steps: [
                'Create a new file `message-service.js`',
                'Use the provided `finn-workshop-helpers` module and use the `queue` to connnect with RabbitMQ',
                'Store new messages in a scoped array',
                'Expose/export a method/function `getMessages` that gives you the messages array',
                'Test your module with our provided [test](https://raw.githubusercontent.com/ivarconr/ws-node-intro/master/tasks/task-3/1/message-service.test.js)',
                'If you want to return promises from `getMessages`, change the test-file accordingly.',
            ],
            hints: [
                {
                    title: 'Create a protected messages array that can hold your state',
                    js: `
function () {
    const messages = [];
    return {
        getMessages () {
            return messages;
        },
    };
}`,
                },
                {
                    title: 'Populate messages from queue into messages array',
                    js: `
function (config, queue) {
    const messages = [];

    queue(config.amqpUri, config.appName)
        .on('message', message => messages.push(message))

    return {
        getMessages () {
            return messages;
        },
    };
};
`,
                },
            ],
            files: [
                {
                    name: 'message-service.test.js',
                    path: 'https://raw.githubusercontent.com/ivarconr/ws-node-intro/master/tasks/task-3/1/message-service.test.js',
                },
            ],
        },
        {
            title: '2 Expose messages on a route',
            description: 'Create a webapp with [express](http://www.expressjs.com/) showing messages from `message-service.js`',
            steps: [
                'Show a list of messages on path `/`',
                'You may use a template engine to ease the HTML rendering',
            ],
            hints: [

            ],
            presenterTasks: [],
        },
        {
            title: '3 Add new-message input',
            description: 'Add a HTML `<form>` with `name` and `message` fields',
            steps: [
                'Expose a `sendMessage` method via the message-service.js',
                'Set up a server route to handle POST request',
                '`sendMessage` should publish the message via the provided queue `finn-workshop-helpers`.',
            ],
            hints: [
                'The [body-parser module](https://www.npmjs.com/package/body-parser) can help you with request body parsing.',
                {
                    title: 'message-service.js with sendMessage()',
                    js: `// Be aware that we now changed the methods to always
// return Promises
module.exports = (config, queueImpl) => {
    const messages = [];

    const q = queueImpl(config.amqpUri, config.appName)
        .on('connected', () => console.log('connected to queue'))
        .on('message', message => messages.push(message))
        .on('error', console.error);

    return {
        getMessages () {
            // return a Promise
            return Promise.resolve(messages);
        },
        sendMessage (name, message) {
            // returns a Promise
            return q.sendMessage(name, message);
        },
    };
};
                    `,
                },
                {
                    title: 'express POST route request handler',
                    js: `
const { getMessages, sendMessage } = service(config, queue);

app.post('/', (req, res) => {
    const { name, message } = req.body;
    sendMessage(name, message)
        .then(getMessages)
        // we render the main index template here with current messages
        .then(messages => res.render('index', {
            messages: messages.reverse()
        }))
        .catch(error => res.render(500, error));
});
                    `,
                },
            ],
            presenterTasks: [],
        },
        {
            title: '4 Realtime: Refactor for multiple users',
            description: 'The chat needs to handle multiple users in the same server',
            steps: [
                'Improve your message-service to be scoped per username',
                'The message-service could also disconnect / stop',
            ],
            hints: [
                'a queueName has to per userName',
                {
                    title: 'per user message-service',
                    js: `
const { queue } = require('finn-workshop-helpers');

// This example takes a simple cache as input
module.exports = (cache, config, userName) => {
    let q = queue(config.amqpUri, \`\${config.appName}\${userName}\`)
        .on('connected', () => console.log(\`connected to queue \${userName}\`))
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
                    `,
                },
                {
                    title: 'Simple cache implementation',
                    js: `
module.exports = class MessagesCache {
    constructor ({ forceLength, resetLengthOn } = {}) {
        this.store = {};
        this.forceLength = forceLength || 100;
        this.resetLengthOn = resetLengthOn || 120;
    }

    pushTo (k, value) {
        const list = this.store[k];
        if (list) {
            list.push(value);
            if (list.length > this.resetLengthOn) {
                this.store[k] = list.splice(list.length - this.forceLength);
            }
        } else {
            this.store[k] = [value];
        }
    }

    get (k) {
        return this.store[k];
    }
};
                    `,
                },
            ],
            presenterTasks: [],
        },
        {
            title: '4 Realtime Chat',
            description: 'Make it realtime',
            image: './3-4.gif',
            steps: [
                'With websockets we can keep a message-service instance open in our request-handler.',
                'Use a node.js websockets module to handle websockets requests',
                'Ask for a username from the user before connecting to the chat',
                'Use browser websockets api to connect to your server',
                'Send and recieve messages over the websocket',
            ],
            hints: [
                'Clientside js websockets api: [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)',
                'Server [ws module](https://github.com/websockets/ws) or use a simple express ws wrapper [express-ws](https://www.npmjs.com/package/express-ws)',
                {
                    title: 'Wrap the message-service in a function that returns chat/connection handler',
                    js: `
const createService = require('./message-service');

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
                        // websockets might have disconnected, \`ws.send\` will throw
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
                    `,
                },
            ],
            presenterTasks: [],
        },
    ],
});
