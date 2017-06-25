/**
 * Created by admin on 6/24/17.
 */

var express     = require('express');
var mongoose    = require('mongoose');
var bodyP       = require('body-parser');

mongoose.connect('mongodb://localhost:27017/showsdb');

var app = express();

app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());

var port = process.env.port || 4800;

var router = express.Router();

var routes = require('./app/routes/routes')(router);


app.use('/api', routes);

app.listen(port,function () {
    console.log("Node instance is running on "+port);
});
