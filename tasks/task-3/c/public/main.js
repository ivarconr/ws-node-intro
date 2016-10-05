'use strict';
document.addEventListener('DOMContentLoaded', function () {
    var host = window.document.location.host.replace(/:.*/, '');
    var ws = new WebSocket('ws://' + host + ':3000/chat');

    ws.onmessage = function (e) {
        var payload = JSON.parse(e.data);
        if (payload.type === 'init') {
            payload.messages.forEach(renderMessage);
            return;
        }

        if (payload.type === 'message') {
            return window.requestAnimationFrame(function () {
                renderMessage(payload);
            });
        }
    };

    ws.onclose = function (e) {
        renderMessage({
            name: 'system close event',
            message: e.reason,
        });
    };

    ws.onerror = function (e) {
        renderMessage({
            name: 'system error event',
            message: e.reason,
        });
    };

    // output message from server
    var messagesContainerEl = document.getElementById('messages');
    var windowHeight = window.innerHeight;
    var scrollHeight = messagesContainerEl.scrollHeight;
    function isInBottom (scrollTop) {
        console.log(scrollTop, windowHeight - scrollHeight);
    }
    function renderMessage (message) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + message.name + ':</strong> ' + message.message;
        messagesContainerEl.appendChild(li);

        if (isInBottom(messagesContainerEl.scrollTop)) {
            messagesContainerEl.scrollTop = messagesContainerEl.scrollTop.scrollHeight;
        }
    }

    // input message
    var newMessageFormEl = document.getElementById('new-message-form');
    var messageInputEl = document.getElementById('message');
    var submitting = false;
    newMessageFormEl.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = messageInputEl.value;
        if (value === '') {
            return;
        }
        if (submitting) {
            return;
        }
        submitting = true;
        ws.send(JSON.stringify({ type: 'send-message', value: value }));

        setTimeout(function () {
            messageInputEl.value = '';
            submitting = false;
        }, 300);
    }, false);

    // input username:
    var userFormEl = document.getElementById('username-input');
    var nameEl = document.getElementById('username');
    var connecting = false;
    userFormEl.addEventListener('submit', function (e) {
        e.preventDefault();
        if (nameEl.value === '') {
            return;
        }
        if (connecting) {
            return;
        }
        connecting = true;
        setTimeout(function () {
            userFormEl.style = 'display:none;';
            messageInputEl.focus();
        }, 300);

        ws.send(JSON.stringify({
            type: 'username',
            value: nameEl.value,
        }));
    }, false);
});
