## Setup
* npm init
* checkout the docs for express http://expressjs.com/

## Tasks
### Task a): Create a simple 'hello world' app in a file called `a.js`
   * Instantiate express and listen on port 3000.
   * You webapp should send `hello world` on request to root `/`
   * Check the result in a browser or with curl. 

### Task a2): Expose a public folder with static files
   * Create a folder (`public`) with a file called `test.html`. 
   * Put some html content in that file
   * Expose it on /public/test.html

### Task b): Write a test for `a.js` using supertest
   * Separate code from `a.js` into 2 separate files: (`server.js` and `app.js`).
   * Let app.js export the instantiated express-`app`object, and make `server.js` call `app.listen` on the correct port number.
   * Make sure the app still works
   * Create a test file `app-test.js` and test that the server responds with 200 ok and "Hello World" string.

### Task c): Render a view with nunjucks.
   * Create a new route `/` that renders a nunjucks template. 
   * The view should render the string "hei <name>".
   * The handler should receive a query string parameter called `name`, that you inject into the render function
   * Make the provided test green.

### Task d): Create a middleware function for request timing. 
   * Continue on your existing app from c)
   * Create a middleware function that logs the request time to the console.
   * Special hint: Remember that the http response object is an event emitter. 

### Task e): Make an HTML form with input fields: `name` and `message`. 
   * Post the form to a new route and print the result.
   * Render the same view after the post, but also print the submitted name below the form.
   * Special hint: You'll need `body-parser` to parse form data

### Task e2): Test your webapp with supertest
  * Create a test that submits the form, and verifies that the new view renders the name parameter

### Task f: Error handling
  * Add a global handler for `uncaughtException` and `unhandledRejection` 
  * add a express middleware to output an error stack for development
  * do not output the stacktrace when `process.env.NODE_ENV === 'production'`
