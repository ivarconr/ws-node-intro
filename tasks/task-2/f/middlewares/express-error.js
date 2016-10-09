'use strict';

const PrettyError = require('pretty-error');
const isProduction = process.env.NODE_ENV === 'production';

function devTemplate (error = {}, prettyStack) {
    return `<!DOCTYPE html>
<title>An error occured ${error.message}</title>
<h1>An error occured</h1>
<h2>${error.message}</h2>
<h3>Pretty stacktrace</h3>
<code><pre>
    ${prettyStack}
</pre></code>

<h3>Full stacktrace</h3>
<code><pre>
    ${error.stack}
</pre></code>`;
}

module.exports = function () {
    const pe = new PrettyError();
    pe.withoutColors();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    return function (error, req, res, next) {
        try {
            if (isProduction) {
                return res.status(500).send('<h1>An error occurred</h1>');
            } else {
                const prettyStack = pe.render(error).trim();
                return res.status(500).send(devTemplate(error, prettyStack));
            }
        } catch (e) {
            next(e);
        }
    };
};
