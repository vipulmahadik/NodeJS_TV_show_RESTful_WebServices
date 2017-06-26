/**
 * Created by admin on 6/24/17.
 */

var express     = require('express');
var mongoose    = require('mongoose');
var bodyP       = require('body-parser');

mongoose.connect('mongodb://heroku_h8d2db42:4qg5l71v0plfbodm93ldjfsnt8@ds139352.mlab.com:39352/heroku_h8d2db42');

var app = express();

app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());

app.set('json spaces', 2);

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
