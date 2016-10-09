# ws-node-intro
Node Workshop for beginners.

## Docs / Guide

[Workshop github pages](https://ivarconr.github.io/ws-node-intro/)

## Source / Solutions for tasks

* [task-1](./tasks/task-1)
* [task-2](./tasks/task-2)
* [task-3](./tasks/task-3)


## Rabbitmq server
We start with docker:

```
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management

# or to use 8081 as amqp port:
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 -p 8081:5672 rabbitmq:3-management
```
