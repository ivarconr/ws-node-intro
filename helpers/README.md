

# Usage of queue

Consuming messages:

```js
    const { queue, config } = require('finn-workshop-helpers');
    const q = queue(config.amqpUri, 'queue-name')

    q.on('connected', (q) => {
          console.log('Conntected');
        })
        .on('message', (msg) =>  console.log('Message:', msg))
        .on('error', (err) => console.error('Error:', err));
```

Send messages:

```js
  q.sendMessage('name', 'msg')
        .then(() => console.log('Message sent'))
        .catch(console.error);
```
