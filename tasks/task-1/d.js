'use strict';

require('colors');
const queue = require('../../helpers/queue');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const nameProm = new Promise((resolve) => rl.question('What is your name? ', resolve))
    .catch(console.error);

function write (line) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(line);
    rl.prompt(true);
}

queue('amqp://10.200.228.112:8081', 'my-chat-$yourName')
    .on('connected', (q) => {
        nameProm.then((name) => {
            write(`${name.blue} (you) connected.`);
            rl.on('line', input => {
                if (input && input.trim()) {
                    q.sendMessage(name, input);
                }
            });
        });
    })
    .on('message', ({ name, message }) => write(`${name.bold.green}: ${message}`))
    .on('error', console.error);
