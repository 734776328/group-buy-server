let redis = require("redis");
let client = redis.createClient();
 
client.on("error", function (err) {
  console.log("Error :" , err);
});
 
client.on('connect', function(){
  console.log('Redis连接成功.');
})

class RedisClient {
  constructor (key, value, expire, callback) {
    this.key = key;
    this.value = value;
    this.expire = expire;
    this.callback = callback;
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
  }
  set (key, value, expire, callback) {
    if ( value instanceof Object ) {
      let resulte = client.hmset(key, value, redis.print);
      console.log('resulte',resulte)
    } else  {
      
      client.set(key, value, function (err, result) {
        if (err) {
          console.log(err);
          callback(err, null);
          return;
        }
        if (!isNaN(expire) && expire > 0) {
          client.expire(key, parseInt(expire));
        }
        callback(null, result)
      })
    }
  }
  get (key, callback) {
    client.get(key, (err,result) => {
      if (err) {
        console.log(err);
        callback(err, null)
        return;
      }
      callback(null, result);
    });
  }
  del (key) {
    client.del(key);
  }
}
export default new RedisClient()