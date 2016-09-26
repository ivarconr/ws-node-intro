Setup
* npm init
* check docs for express http://expressjs.com/

* Task a): create simple 'hello world' app in a single file
    * Solution: Copy-paste from docs and run.
    * Check result in browser.

* Task a2): Expose a public folder with static files
    * Create a folder with a file called test.html
    * Expose on /public/test.html
    * Hints: express middleware

* Task b): Write a test for "a" using supertest
    * Separate code from "a" into 2 separate files (server.js and app.js).  Make sure the app still works.
    * Create a app-test.js. and test that the server responds with 200 ok and "Hello World" string.
    * Hints: supertest
    * npm install supertest --save-dev

* Task c): Render a view with nunjucks.
    * Make provided test green.

* Task d): Make a middleware for requesttiming. use in previous example
    * Solution - app.use(require('./../d/requestTimer'));


* Task e): Make a form with name and message. Post to new route and print.
    * Solution - TODO

**TODO:**
- Add hints to task-description. 
