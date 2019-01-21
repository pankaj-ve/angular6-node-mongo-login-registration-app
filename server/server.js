let app = require('express')(),
    server = require('http').Server(app),
    bodyParser = require('body-parser')
    express = require('express'),
    cors = require('cors'),
    http = require('http'),
    path = require('path');
    
let mongoose = require('./Utilities/mongooseConfig')();

let loginRoute = require('./Routes/login'),
    util = require('./Utilities/util'),
    config = require("./Utilities/config").config;

    //app.use(express.static('/public'))
 app.use("/media", express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(cors());

app.use(function(err, req, res, next) {
  return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use('/user', loginRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next();
}); 
       
/*first API to check if server is running*/
app.get('/', function(req, res) {
    res.send('hello, world!');
});

  

server.listen(config.NODE_SERVER_PORT.port,function(){
    console.log('app listening on port:'+config.NODE_SERVER_PORT.port);
});
