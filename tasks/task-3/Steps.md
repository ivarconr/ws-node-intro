Setup
* npm init
* check docs for https://nodejs.org/dist/latest-v6.x/docs/api/readline.html

# requirements:

## Present: 

**Task a):** Create a webapp with express showing messages from the chat client you used in task 1. 
* Use the provided `finn-workshop-helpers` module and use the queue to connnect with RabbitMQ
* Use a template engine to ease the HTML rendering

**Task b):** Expand on the solution with a HTML from with "name" and "message" fields. 
* Set up a route to handle POST request
* Publish the message via the provided `finn-workshop-helpers`. 

**Task c)** The solution you have so far is kind of stupid.
* A chat is usually real-time with messages updated automatically. 
* Use websockets or similar to make it more real-time-ish!