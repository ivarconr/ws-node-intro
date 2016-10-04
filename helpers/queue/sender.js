'use strict';
const chalk = require('chalk');
const queue = require('./');
const readline = require('readline');

const data = [
    {
        name: 'Ivar',
        message: 'Hello there robot!',
    },
    {
        name: 'Robot',
        message: 'Hi Ivar!!',
    },
    {
        name: 'Soca',
        message: 'I need some water',
    },
    {
        name: 'Ivar',
        message: 'oh no!',
    },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


let sentMessages = 0;
let totalMessages = 0;
const date = new Date();
function status () {
    totalMessages++;
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    rl.write(`Messages published via exchange ${chalk.red(totalMessages)} since ${chalk.green(date.toString())}`);
}

queue('amqp://localhost:8081', 'busy-queue')
    .on('message', () => status())
    .on('error', console.error)
    .on('connected', q => {
        console.log('Connected');

        function messageSender ({ message, name }) {
            setTimeout(() => {
                sentMessages++;
                q.sendMessage(name, `${sentMessages}: ${message}`)
                    .catch(console.error);
            }, Math.round(Math.random() * 500));
        }

        setInterval(() => {
            data.forEach(messageSender);
        }, 1000);
    });




