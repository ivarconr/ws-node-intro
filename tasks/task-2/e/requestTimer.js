function requestTimer(req, res, next) {
    var start = Date.now();
    res.on('finish', function () {
        var duration = Date.now() - start;
        console.log("Request time " + duration + "ms", req.url);
    });
    next();
};

module.exports = requestTimer;

