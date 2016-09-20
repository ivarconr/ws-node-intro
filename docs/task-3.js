'use strict';

window.tasks('Task 3', {
    title: 'Task 3',
    description: 'Task 3 description',
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
