Setup
* npm init
* check docs for https://nodejs.org/dist/latest-v6.x/docs/api/readline.html

# requirements:
* npm
* readline
* eventemitter
* rabbitmq (what is a queue? Exchange? (map to kafka))

* Task a): get `readline` to accept input
    * Solution: Copy-paste from docs and run

* Task b): get `readline` to ask for name, and then wait for messages. Messages should be printed to the console. After a message has been sent, it should go back waiting for a new message. 
    * Solution: add recursive askForMessage
    * + Write over "ask for message text" ? / TODO: replace prev line?

* Task c): connnect with RabbitMQ with module `x`(TODO), and write messages to console
    * npm install `finn-workshop-helpers`
    * Lese `README.md` til `finn-workshop-helpers/queue` lib
    * Påse at hver bruker unikt queueName.
    * Solution: 
        * write a queue consumer with lib that console logs output from queue 'busy-queue'
            * TODO: course spams busy queue with messages
        * url: 0.0.0.0:8081 (safe PORT in wifi?)

* Task d) create a readline chat input and output messages
    * get username
    * publish message via `queue`
    * connect to the queue and write messages to console
    * HINT: use `readline.prompt()` and `readline.on('line', (line) => {})` sendMessage/publish message to queue
