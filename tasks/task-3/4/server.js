'use strict';

const { config } = require('../../../helpers');
const { makeApp } = require('./app');
const app = makeApp(config);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web server listening on http://localhost:${PORT}`);
});
