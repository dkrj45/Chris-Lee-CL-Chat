const redis = require("ioredis");

const redisClient = new redis.Redis(
  6379,
  process.env.REDIS_HOST || "localhost"
);

module.exports = redisClient;
