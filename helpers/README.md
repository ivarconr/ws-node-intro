

# Usage of queue

Consuming messages: 

```js
    const { queue, config } = require('finn-workshop-helpers');
    queue(config.amqpUri, 'queue-name')
        .on('connected', (q) => )
        .on('message', console.log)
        .on('error', console.error);
```

Send messages: 

```js
    const { queue } = require('finn-workshop-helpers');

    queue(config.amqpUri, 'queue-name')
        .sendMessage('name', 'msg')
        .then(() => console.log('sent'))
        .catch(console.error);
```
