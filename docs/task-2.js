'use strict';

window.tasks('Task 2', {
    title: 'Task 2',
    description: '* checkout the docs for express http://expressjs.com/',
    children: [
        {
            title: 'A',
            description: 'create simple \'hello world\' app in a file called `a.js`',
            steps: [
                'Instantiate express and listen on port 3000',
                'You webapp should send `hello world` on request to root `/`',
                'Check the result in a browser or with curl.',
            ],
            hints: [
                'Express docs: http://expressjs.com/',
                'Example solution: http://expressjs.com/en/starter/hello-world.html',
            ],
            solution: 'a.js',
            presenterTasks: [],
        },
        {
            title: 'A-2',
            description: 'Expose a public folder with static files.',
            steps: [
                'Create a folder (`public`) with a file called `test.html`.',
                'Put some html content in that file',
                'Expose it on /public/test.html',
            ],
            hints: [
                'There is an express middleware function that does the work of exposing a directory of files (see https://expressjs.com/en/starter/static-files.html)',
            ],
        },
        {
            title: 'B',
            description: 'Write a test for `a.js` using supertest',
            steps: [
                'Separate code from `a.js` into 2 separate files: (`server.js` and `app.js`).',
                'Let app.js export the instantiated express-`app`object, and make `server.js` call `app.listen` on the correct port number.',
                'Make sure the app still works',
                'Create a test file `app-test.js` and test that the server responds with 200 ok and "Hello World" string.',
            ],
            hints: [
                'npm install supertest --save-dev',
                'https://github.com/visionmedia/supertest',
            ],
        },
        {
            title: 'C',
            description: 'Render a view with nunjucks.',
            steps: [
                'Create a new route `/` that renders a nunjucks template.',
                'The view should render the string "hei <name>".',
                'The handler should receive a query string parameter called `name`, that you inject into the render function',
                'Make the provided test green',
            ],
            files: [
                'https://raw.githubusercontent.com/ivarconr/ws-node-intro/master/tasks/task-2/c/app.test.js',
            ],
            hints: [
                'Use the npm package `nunjucks` (`npm install nunjucks`)',
                'Nunjucks documentation: https://github.com/mozilla/nunjucks/blob/master/docs/getting-started.md (see express example)',
                'Query string parameters in express: http://expressjs.com/en/api.html#req.query',
            ],
        },
        {
            title: 'D',
            description: 'Create a middleware function for request timing.',
            steps: [
                'Continue on your existing app from c)',
                'Create a middleware function that logs the request time to the console.',
                'Special hint: Remember that the http response object is an event emitter.',
            ],
            hints: [
                'Express middlewares: http://expressjs.com/en/guide/writing-middleware.html',
                'Create a variable that holds the current timestamp (Date.now())',
                'Let the middleware chain continue by calling next()',
                'After next has finished, create a new variable that subtracts the current timestamp with the one you created before',
                'Print the result using console.log',
            ],
        },
        {
            title: 'E',
            description: 'Make an HTML form with input fields: `name` and `message`',
            steps: [
                'Post the form to the new route and print the result.',
                'Render the same view after the post, but also print the submitted name below the form.',
                'Special hint: You\'ll need `body-parser` to parse form data',
            ],
            hints: [
                'Create a post handler with the same url as you give the form action',
                'Express routes: http://expressjs.com/en/guide/routing.html (see app.post example)',
                'Html forms: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form',
                'Accessing form data in an express handler: http://expressjs.com/en/api.html#req.body',
                [
                    'If-checks in nunjucks can be done like this:',
                    '```',
                    '{% if name %}',
                    'stuff',
                    '{% endif %}',
                    '```',
                ].join('\n'),
            ],
        },
        {
            title: 'E-2',
            description: 'Test your webapp with supertest',
            steps: [
                'Create a test that submits the form, and verifies that the new view renders the name parameter',
            ],
        },
        {
            title: 'F',
            optional: true,
            description: 'Bonus Task: Error handling',
            steps: [
                'Add a global handler for `uncaughtException` and `unhandledRejection`',
                'add a express middleware to output an error stack for development',
                'do not output the stacktrace when `process.env.NODE_ENV === \'production\'`',
            ],

        },
    ],
});
