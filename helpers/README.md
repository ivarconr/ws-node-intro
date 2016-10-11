

# Usage of queue

Consuming messages:

```js
    const { queue, config } = require('finn-workshop-helpers');
    const q = queue(config.amqpUri, 'queue-name')

    q.on('connected', (q) => )
        .on('message', console.log)
        .on('error', console.error);
```

Send messages:

```js
  q.sendMessage('name', 'msg')
        .then(() => console.log('sent'))
        .catch(console.error);
```
