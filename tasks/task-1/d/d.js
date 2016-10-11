'use strict';

const { queue, config } = require('../../../helpers');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const namePrompter = new Promise((resolve) => rl.question(' What is your name? ', resolve))
    .catch(console.error);

namePrompter.then((userName) => {
    function write (line) {
        readline.clearLine(rl.output, 0);
        readline.cursorTo(rl.output, 0);
        console.log(line);
        rl.setPrompt(`${userName} > `);
        rl.prompt(true);
    }

    queue(config.amqpUri, `my-chat-${userName}`)
        .on('connected', (q) => {
            write(`${userName} (you) connected.`);
            rl.on('line', input => {
                if (input && input.trim()) {
                    q.sendMessage(userName, input.trim());
                }
            });
        })
        .on('message', ({ name, message }) => write(`${name}: ${message}`))
        .on('error', console.error);
});

