const redis = require('ioredis');

const redisClient = new redis.Redis();

module.exports = redisClient;