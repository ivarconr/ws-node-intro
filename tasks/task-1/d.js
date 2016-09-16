'use strict';

const chalk = require('chalk');
const queue = require('../../helpers/queue');
const config = require('./config');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const nameProm = new Promise((resolve) => rl.question(`${chalk.black.bgRed(' What is your name? ')} `, resolve))
    .catch(console.error);

function write (line) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(line);
    rl.prompt(true);
}

queue(config.amqpUri, 'my-chat-$yourName')
    .on('connected', (q) => {
        nameProm.then((name) => {
            write(`${chalk.blue(name)} (you) connected.`);
            rl.on('line', input => {
                if (input && input.trim()) {
                    q.sendMessage(name, input);
                }
            });
        });
    })
    .on('message', ({ name, message }) => write(`${chalk.bgYellow.blue.bold(` ${name} `)}: ${message}`))
    .on('error', console.error);
