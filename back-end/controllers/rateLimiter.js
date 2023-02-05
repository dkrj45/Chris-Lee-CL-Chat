const redisClient = require("../redis");

module.exports.rateLimiter = async(req,res,next) => {
    const ip = req.connection.remoteAddress;
    const [response] = await redisClient.multi().incr(ip).expire(ip,60).exec();
    console.log(response[1])
    if(response[1]>10){
        res.json({loggedIn: false, status: "Please try again in a minute."})
    } else {
        next();
    }
    
}