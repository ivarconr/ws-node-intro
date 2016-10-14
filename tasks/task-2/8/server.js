'use strict';
require('./node-error-handling');
const { makeApp } = require('./app');
const app = makeApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT)
    .on('listening', () => {
        console.log(`Web server listening on http://localhost:${PORT}`);
    })
    .on('error', (error) => {
        console.error('Express startup failed');
        console.error(error);
    });
