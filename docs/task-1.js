'use strict';

window.tasks('Task 1', {
    title: 'Task 1',
    description: 'Task 1 description',
    children: [
        {
            title: 'A',
            description: 'In the first task you should familirize yourself with `readline`. Use `readline` to ask a question (e.g. What is your name?) to be answered with the inputstream `process.stdin` and print the response to the writestream`process.stdout`.',
            hints: [
                'https://nodejs.org/api/readline.html#readline_readline',
            ],
            image: './1a.gif',
            solution: 'a/a.js',
            time: 5,
            presenterTasks: [],
        },
        {
            title: 'B',
            description: 'In this task you will write a small script that should make it possible to chat with yourself. You must get `readline` to ask for your _name_, and then react to line input and print as a message to `process.stdout`. When printing, you should prefix the message with the provided name. After a message has been submittet, it should prompt for a new message.',
            hints: [
                'Use same interface as _task 1a_',
                'Ask a question via the interface.',
                'React to the `line`-event.',
                'Remember to reprompt after printing.',
            ],
            image: './1b.gif',
            solution: 'b.js',
            time: 10,
            presenterTasks: [
                'Show gif / result',
                'Remember to start rabbitmq and the message sender in `finn-workshop-helpers`',
            ],
        },
        {
            title: 'C',
            description: 'Now we will begin to implement an actual chat. In this task you will only consume messages. You will use the provided `finn-workshop-helpers` module and use the `queue` to connnect with RabbitMQ. You should print messages emitted from the queue to the `coxrxnsole.log`. You will need to use a unique queue-name to ensure that only you consume this queue.',
            prerequisites: [
                'ampqURL',
            ],
            hints: [
                'npm install `finn-workshop-helpers`',
                'remember to also check errors.',
                'Find and read the readme',
            ],
            image: './1c.gif',
            solution: 'c.js',
            time: 10,
            presenterTasks: [
                'spawn sender bot',
                'ampqURL',
            ],
        },
        {
            title: 'D',
            description: 'In the last task we fill finalize the command-line based chat client. Now you should first have the user register their name, print all incomming messages, and allow the user to send messages.',
            hints: [
                'You have done most of this already in task (b) and (c). ',
                'Read the `finn-workshop-helpers` readme to learn how to publish messages.',
                'Use clearLine and cursorTo(0) and reprompt after printing, like we did in task b.',
            ],
            extras: [
                'Add colors to output',
            ],
            image: './1d.gif',
            solution: 'd.js',
            time: 15,
            presenterTasks: [],
            todos: ['check if write Solution could be done simpler.'],
        },
    ],
});
