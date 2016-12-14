window.tasks('Task 2', {
    title: 'Task 2',
    description: 'Express.js exercises. Checkout the docs for express http://expressjs.com/',
    children: [
        {
            title: '1 Hello world',
            description: 'Create simple \'hello world\' app in a file called `task2-1.js`',
            steps: [
                'Instantiate express and listen on port 3000',
                'You webapp should send `hello world` on request to root `"/"`',
                'Check the result in a [browser](http://localhost:3000/) or with curl.',
            ],
            hints: [
                'Express docs: [http://expressjs.com/](http://expressjs.com/)',
                'Example solution: [http://expressjs.com/en/starter/hello-world.html](http://expressjs.com/en/starter/hello-world.html)',
            ],
            presenterTasks: [],
        },
        {
            title: '2 Static',
            description: 'Expose a public folder with static files.',
            steps: [
                'Create a folder (`public`) with a file called `test.html`.',
                'Put some html content in that file',
                'Expose it on [`/public/test.html`](http://localhost:3000/public/test.html) ',
            ],
            hints: [
                'There is an express middleware function that does the work of exposing a directory of files (see [https://expressjs.com/en/starter/static-files.html](https://expressjs.com/en/starter/static-files.html))',
            ],
        },
        {
            title: '3 Supertest',
            description: 'Write a test for `task2-1.js` using supertest',
            steps: [
                'Separate code from `task2-1.js` into 2 separate files: (`server.js` and `app.js`).',
                'Let `app.js` export the instantiated express object (`const app = express()`), and make `server.js` call `app.listen` on the correct port number.',
                'Verify that server still works',
                'Create a test file `app-test.js` and test that the server responds with HTTP status code `200 OK` on route `/home` and "Hello World" as body/string.',
            ],
            hints: [
                'Run `npm install supertest --save-dev`',
                'Supertest [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)',
            ],
        },
        {
            title: '4 Templating',
            description: 'Render a view with nunjucks.',
            steps: [
                'Create a new route on path `"/"` that renders a nunjucks template.',
                'The view should render the string `"hei <name>"`.',
                'The request-handler should receive a query string parameter called `name`, that you inject into the render function',
                'Make the [provided test](https://raw.githubusercontent.com/ivarconr/ws-node-intro/master/tasks/task-2/4/app.test.js) green/pass without exceptions',
                'Check the result in a [browser](http://localhost:3000/?name=Julenissen) or with curl.',
            ],
            files: [
                {
                    name: 'app.test.js',
                    path: 'https://raw.githubusercontent.com/ivarconr/ws-node-intro/master/tasks/task-2/4/app.test.js',
                },
            ],
            hints: [
                'Use the npm package `nunjucks`. Run `npm install nunjucks --save`',
                'Nunjucks documentation: [Getting Started](https://github.com/mozilla/nunjucks/blob/master/docs/getting-started.md) (see express example)',
                'Query string parameters in express: [http://expressjs.com/en/api.html#req.query](http://expressjs.com/en/api.html#req.query)',
            ],
        },
        {
            title: '5 Middleware',
            description: 'Create a middleware function for request timing.',
            steps: [
                'Continue on your existing app from c)',
                'Create a middleware function that logs the request time to the console.',
                'Special hint: Remember that the http response object is an event emitter.',
            ],
            hints: [
                'Express middlewares: [http://expressjs.com/en/guide/writing-middleware.html](http://expressjs.com/en/guide/writing-middleware.html)',
                'Create a variable that holds the current timestamp (`Date.now()`)',
                'Let the middleware chain continue by calling `next()`',
                'After next has finished, create a new variable that subtracts the current timestamp with the one you created before',
                'Print the result using `console.log`',
            ],
        },
        {
            title: '6 Form Input',
            description: 'Make an HTML form with input fields: `name` and `message`',
            steps: [
                'Post the form to the new route and print the result.',
                'Render the same view after the post, but also print the submitted name below the form.',
                'Special hint: You\'ll need a module called `body-parser` to parse form data',
            ],
            hints: [
                'Create a post handler with the same url as you give the form action',
                'Express routes: [expressjs.com/en/guide/routing.html](http://expressjs.com/en/guide/routing.html) (see app.post example)',
                'Html forms: [MDN: My first HTML form](ttps://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form)',
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
            title: '7 Supertest part 2',
            description: 'Test your webapp with supertest',
            steps: [
                'Create a test that submits the form, and verifies that the new view renders the name parameter',
            ],
        },
        {
            title: '8 Optional: Errorhandling',
            optional: true,
            description: 'Optional Bonus Task: Error handling',
            steps: [
                'Add a global handler for `uncaughtException` and `unhandledRejection`',
                'add a express middleware to output an error stack for development',
                'do not output the stacktrace when `process.env.NODE_ENV === \'production\'`',
            ],

        },
    ],
});
