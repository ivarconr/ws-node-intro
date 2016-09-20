'use strict';

window.tasks('Task 2', {
    title: 'Task 2',
    description: 'Task 2 description',
    children: [
        {
            title: 'Task 2 A',
            hints: [
                'some hint 1',
                'some hint 2',
            ],
            solution: 'c.js',
            presenterTasks: [],
        },
    ],
});
