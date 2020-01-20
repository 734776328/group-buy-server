import mongoose from 'mongoose';
import chalk from 'chalk'
const config = {
  url: 'mongodb://127.0.0.1:27017/tuantuan',
}
mongoose.set('useCreateIndex', true);
mongoose.connect(config.url,{
  //在mongoose5.X中不再需要
  // useMongoClient: true
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})
db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});
db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

