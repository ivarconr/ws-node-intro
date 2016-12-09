window.tasks('Task 3', {
    title: 'Task 3',
    description: 'Create a chat webapp',
    children: [
        {
            title: '1 Collecting messages',
            description: 'Make a module that wraps queue module (from the chat client you used in task 1.)',
            steps: [
                'Create a new file `message-service.js`',
                'Use the provided `finn-workshop-helpers` module and use the `queue` to connnect with RabbitMQ',
                'Store new messages in a scoped array',
                'Expose/export a method/function getMessages that gives you the messages array',
            ],
            hints: [
                {
                    type: 'snippet',
                },
                // TODO add code snippet support
                // `${(function () {
                //     const messages = [];

                //     return {
                //         getMessages () {
                //             return messages;
                //         },
                //     };
                // }).toString()}`,
            ],
        },
        {
            title: '2 Expose on a route',
            description: 'Create a webapp with express showing messages from `message-service.js`',
            steps: [
                'Use a template engine to ease the HTML rendering',
            ],
            hints: [

            ],
            presenterTasks: [],
        },
        {
            title: '3 Add new-message',
            description: 'Expand on the solution with a HTML <form> with `name` and `message` fields',
            steps: [
                'Set up a route to handle POST request',
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
                'clientside js websockets api: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
                'server https://github.com/websockets/ws',

            ],
            presenterTasks: [],
        },
    ],
});
