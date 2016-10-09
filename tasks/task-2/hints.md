## Stuck?
Here's a few hints to help you out

### Task-a
  * Express docs: http://expressjs.com/
  * Example solution: http://expressjs.com/en/starter/hello-world.html

### Task-a2
  * There is an express middleware function that does the work of exposing a directory of files (see https://expressjs.com/en/starter/static-files.html)
  
### Task-b
  * npm install supertest --save-dev
  * https://github.com/visionmedia/supertest

### Task-c
* Use the npm package `nunjucks` (`npm install nunjucks`)
* Nunjucks documentation: https://github.com/mozilla/nunjucks/blob/master/docs/getting-started.md (see express example)
* Query string parameters in express: http://expressjs.com/en/api.html#req.query

### Task-d
* Express middlewares: http://expressjs.com/en/guide/writing-middleware.html
* Create a variable that holds the current timestamp (Date.now())
* Let the middleware chain continue by calling next()
* After next has finished, create a new variable that subtracts the current timestamp with the one you created before
* Print the result using console.log


### Task-e
* Create a post handler with the same url as you give the form action
* Express routes: http://expressjs.com/en/guide/routing.html (see app.post example)
* Html forms: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form
* Accessing form data in an express handler: http://expressjs.com/en/api.html#req.body
* If-checks in nunjucks can be done like this:
```
{% if name %}
stuff
{% endif %}
```

### Task f
*