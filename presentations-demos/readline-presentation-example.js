'use strict';
const { createInterface, clearLine, cursorTo } = require('readline');
const rl = createInterface({ input: process.stdin, output: process.stdout });

function writeAndPrompt (line) {
    clearLine(rl.output, 0);
    cursorTo(rl.output, 0);
    console.log(line);
    rl.prompt(true);
}

rl.on('line', writeAndPrompt);

setInterval(() => {
    writeAndPrompt('Counter');
}, 1000);

rl.setPrompt('Hello? ');
rl.prompt(true);
