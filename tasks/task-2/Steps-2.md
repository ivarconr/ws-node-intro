Setup
* npm init
* check docs for express http://expressjs.com/

* Task a): create simple 'hello world' app in a single file
    * Solution: Copy-paste from docs and run.
    * Check result in browser.

* Task a2): Use middleware to expose a public folder. 

* Task b): Write a test for "a" using supertest
    * Solution: Separate code from "a" into server and app. npm install supertest. Run testfile.
    * npm install supertest --save-dev

* Task c): Render a view with handlebars. Use handlebars-express.
    * Make provided test green.

* Task d): Make a middleware for requesttiming. use in previous example
    * Solution - app.use(require('./../d/requestTimer'));


* Task e): Make a form with name and message. Post to new route and print.
    * Solution - TODO

**TODO:**
- Implementere egen middelware for å time-request-tider. 
- Add hints to task-description. 
