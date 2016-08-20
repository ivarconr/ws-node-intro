var messages = [];

function handleMessage(msg) {
    console.log(msg.content.toString());
    messages.push(JSON.parse(msg.content));
}


module.exports = function(amqp) {
    amqp(handleMessage);
    
    return {
        getMessages: () => messages.slice(0)
    }
}