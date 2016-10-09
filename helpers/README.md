

# Usage of queue

Consuming messages: 

```js
    const queue = require('finn-workshop-helpers/queue');
    queue('ampq://0.0.0.0:8081', 'queue-name')
        .on('connected', (q) => )
        .on('message', console.log)
        .on('error', console.error)
```

Send messages: 
```js
    const c = require('finn-workshop-helpers/queue');

    queue('ampq://0.0.0.0:8081', 'queue-name')
        .sendMessage('name', 'msg')
        .then(() => console.log('sent'))
        .catch(console.error);
```
