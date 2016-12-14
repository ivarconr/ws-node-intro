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
function (config) {
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
            description: 'Create a webapp with express showing messages from `message-service.js`',
            steps: [
                'Show messages on path `/`',
                'You may use a template engine to ease the HTML rendering',
            ],
            hints: [

            ],
            presenterTasks: [],
        },
        {
            title: '3 Add new-message',
            description: 'Expand on the input solution with a HTML `<form>` with `name` and `message` fields',
            steps: [
                'Set up a server route to handle POST request',
                'Publish the message via the provided `finn-workshop-helpers`.',
            ],
            hints: [

            ],
            presenterTasks: [],
        },
        {
            title: '4 Realtime',
            description: 'The solution you have so far is kind of simple.',
            image: './3-4.gif',
            steps: [
                'A chat is usually real-time with messages updated automatically.',
                'Use websockets or similar to make it more real-time-ish!',
            ],
            hints: [
                'Clientside js websockets api: [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)',
                'Node.js / Server [ws module](https://github.com/websockets/ws)',

            ],
            presenterTasks: [],
        },
    ],
});
