Setup
* npm init
* check docs for https://nodejs.org/dist/latest-v6.x/docs/api/readline.html

# requirements:

## Present: 

* npm (michael)
* readline (benjamin)
* eventemitter (sveinung)
* rabbitmq (what is a queue? Exchange? (map to kafka)) (ivar)

**Task a):** In the first task you should familirize yourself with `readline` use to ask a question to be answered with the `process.stdin` and print the response to `process.stdout`.
 
 * Hint: https://nodejs.org/api/readline.html#readline_readline
 * Solution: a.js
 * Time: 5 min


**Task b):** In this task you will write a small client only able to chat with yourself. You must get `readline` to ask for your _name_, and then react to line input and print as a message to `process.stdout`. When printing, you should prefix the message with the provided name. After a message has been submittet, it should prompt for a new message. 

 * Hint: Use same interface as _task 1a_.
 * Hint: Ask a question via the interface.
 * Hint: React to the `line`-event. 
 * Hint: Remember to reprompt after printing. 
 * Solution: b.js
 * Time: 10 min
 * Presenter: Remember to start rabbitmq and the message sender in `finn-workshop-helpers`. 

**Task c):** Now we will begin to implement an actual chat, where you can reach other people. You will use the provided `finn-workshop-helpers` module and use the `queue` to connnect with RabbitMQ. You should print messages emitted from the queue to the `console.log`. You will need to use a unique queue-name to asure that only you consume this queue.  

 * Prerequisite: ampqURL
 * Hint: npm install `finn-workshop-helpers`
 * Hint: remember to also check errors.
 * Hint: Find and read the readme
 * Time: 10 min

**Task d)** In the last task we fill finalize the command-line based chat client. Now you should first have the user register their name, print all incomming messages, and allow the user to send messages.

 * Hint: You have done most of this already in task (b) and (c). 
 * Hint: Read the `finn-workshop-helpers` readme to learn how to publish messages.
 * Hint: Use clearLine and cursorTo(0) and reprompt after printing, like we did in task b. 
 * Extra: Add colors to output.
 * Time: 15 min
 * Todo: check if write Solution could be done simpler.  