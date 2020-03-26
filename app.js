import express from 'express';
import router from './routes/index.js';
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'

import './dbs/mongodb'
import './dbs/redis'
let app = express();
app.listen(3000, () => {
  console.log('server is start...')
})

app.use(session({
	secret: '##@@##',
	resave: false,
	saveUninitialized: true
}))

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  		res.sendStatus(200);
	} else {
    	next();
	}
});
app.use('/public', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '30mb',extended: false }))
// app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.json({limit : '5100000kb'}))

app.use(session({
	secret: '$@&*W#$^',
	resave: false,
	saveUninitialized: true
}))

router(app);
