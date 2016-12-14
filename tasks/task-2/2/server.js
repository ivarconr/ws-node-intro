'use strict';

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}`);
});
