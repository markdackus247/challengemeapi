const amqp = require('amqplib/callback_api');

amqp.connect(
    'amqp://localhost',
    (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel((error1, channel) => {
            if (error1, channel) {
                throw error1;                
            }

            var queue = 'hello';
            var msg = 'Hello world';
        
            channel.assertQueue(queue, {
              durable: false
            });
        
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        })
    }
);

exports.amqp = amqp;