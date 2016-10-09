'use strict';

const { join, dirname } = require('path');
const readDirs = require('fs-readdir-recursive');
const execa = require('execa');
const chalk = require('chalk');

const filter = (x) => !x.includes('node_modules') &&
    !x.includes('public') &&
    (!x.includes('.') || x.includes('.js'));
const rootDir = join(__dirname, 'tasks');
const files = readDirs(rootDir, filter);

const basePort = 1337;

Promise.all(
    files
        .map((entry) => join(rootDir, entry))
        .map((path, i) => {
            const PORT = basePort + i;
            console.log(`PORT=${chalk.blue(PORT)} node ${chalk.green(path)}`);
            return execa('node', [path], { timeout: 1, cwd: dirname(path), env: { PORT } });
        })
).then(result => {
    console.log('success', result);
})
.catch(e => console.error(e));
