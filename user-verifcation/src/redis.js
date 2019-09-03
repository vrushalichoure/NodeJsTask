

const redis = require('redis');
const redisClient = redis.createClient({ host: 'localhost', port: 6379 });


redisClient.on('ready', function () {
    console.log('Redis is ready');
});

redisClient.on('error', function () {
    console.log('Error in Redis');
});


export default redisClient;