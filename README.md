# ws-node-intro
Node Workshop for beginners.

Tasks: 
- Connect to queue 
- consume messages
- write test 
- setup express
- show them in a page


TODO:
set up a few tests with super-test and such do demonstrate the mocking part!

## Rabbitmq server
We start with docker:

```
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management
```
