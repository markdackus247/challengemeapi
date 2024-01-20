const amqp = require('amqplib/callback_api');

async function toBroker(messageObject) {
    amqp.connect('amqp://localhost/', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            const queue = 'Crebo';
            const message = JSON.stringify(messageObject);
            
            channel.assertQueue(queue, {
                durable: false
            });
    
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
    });
}
exports.toBroker = toBroker;