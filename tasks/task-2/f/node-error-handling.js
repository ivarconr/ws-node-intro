'use strict';

process.on('uncaughtException', err => {
    console.error('global uncaught exception.', err);
    process.nextTick(() => {
        process.exit(1);
    });
});

process.on('unhandledRejection', err => {
    console.error('global uncaught promise rejection.', err);
    process.nextTick(() => {
        process.exit(1);
    });
});

process.on('SIGINT', () => {
    console.log('shutdown - got SIGINT');
    process.nextTick(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('shutdown - got SIGTERM');
    process.nextTick(() => {
        process.exit(0);
    });
});

process.on('SIGHUP', () => {
    console.log('shutdown - got SIGHUP');
    process.nextTick(() => {
        process.exit(0);
    });
});
