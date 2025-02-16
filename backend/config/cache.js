const redis = require('redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('./config');

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('🚀 Redis Connected Successfully');
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Connection Error:', err);
});

module.exports = redisClient;
