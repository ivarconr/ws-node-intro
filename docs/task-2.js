'use strict';

window.tasks('Task 2', {
    title: 'Task 2',
    description: '...',
    children: [
        {
            title: 'A',
            description: 'create simple \'hello world\' app in a single file',
            hints: [],
            solution: 'a.js',
            presenterTasks: [],
        },
        {
            title: 'A-2',
            description: 'Use middleware to expose a public folder.',
            hints: [],
        },
        {
            title: 'B',
            description: 'Write a test for "a" using supertest',
            hints: [],
        },
        {
            title: 'C',
            description: 'Render a view with handlebars. Use handlebars-express.',
            hints: [],
        },
        {
            title: 'D',
            description: 'Make a middleware for requesttiming. use in previous example',
            hints: [],
        },
        {
            title: 'E',
            description: 'Make a form with name and message. Post to new route and print.',
            hints: [],
            todos: ['solution'],
        },
    ],
});
