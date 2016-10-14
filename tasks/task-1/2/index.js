'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('What is your name? ', (name) => {
    rl.on('line', (line) => {
        console.log(`${name} : ${line}`);
        rl.prompt(true);
    });

    rl.prompt(true);
});
