/**
 * Created by admin on 6/24/17.
 */

var express     = require('express');
var mongoose    = require('mongoose');
var bodyP       = require('body-parser');

require('./app/models/secret')(mongoose);

var app = express();

app.set('json spaces', 4);
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());


var port = process.env.PORT || 4800;

var router = express.Router();

var routes = require('./app/routes/routes')(router);


app.use('/api', routes);

app.get('/',function (req,res) {
    res.redirect('/api');
});

app.listen(port,function () {
    console.log("Node instance is running on "+port);
});
