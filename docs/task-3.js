window.tasks('Task 3', {
    title: 'Task 3',
    description: 'Create a chat webapp',
    children: [
        {
            title: '1',
            description: 'Make a module that wraps queue module (from the chat client you used in task 1.)',
            steps: [
                'It should be ... tODO'
            ],
        },
        {
            title: '2',
            description: 'Create a webapp with express showing messages ',
            steps: [
                'Use the provided `finn-workshop-helpers` module and use the queue to connnect with RabbitMQ',
                'Use a template engine to ease the HTML rendering',
            ],
            hints: [

            ],
            presenterTasks: [],
        },
        {
            title: '3',
            description: 'Expand on the solution with a HTML from with "name" and "message" fields.',
            steps: [
                'Set up a route to handle POST request',
                'Publish the message via the provided `finn-workshop-helpers`.',
            ],
            hints: [

            ],
            solution: 'b',
            presenterTasks: [],
        },
        {
            title: '3',
            description: 'The solution you have so far is kind of stupid.',
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
