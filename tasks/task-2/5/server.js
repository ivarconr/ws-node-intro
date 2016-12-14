'use strict';

const { makeApp } = require('./app');
const app = makeApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web server listening on http://localhost:${PORT}`);
});
