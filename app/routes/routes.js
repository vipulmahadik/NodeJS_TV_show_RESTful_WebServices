/**
 * Created by admin on 6/24/17.
 */

module.exports = function (router) {

    var show = require('../models/show');

    router.use(function (req,res,next) {
        console.log("Requested access !");
        next();
    });

    router.get('/', function (req, res) {
        res.json({
            message: "Everything working great!",
            paths: "You can access the api on following urls",
            urls: {
                GET: {
                    "https://guarded-river-66359.herokuapp.com/api/shows": "Get all shows from database",
                    "https://guarded-river-66359.herokuapp.com/api/show/594f2ff6edd48a42ffd988ee": "Get details about a single show",
                    "https://guarded-river-66359.herokuapp.com/api/genre/comedy": "Get all the shows from Comedy genre",
                    "https://guarded-river-66359.herokuapp.com/api/title/sherlock":"Get shows with title Sherlock"

                },
                POST:{
                    "https://guarded-river-66359.herokuapp.com/api/shows": "For adding a new show in the Database"
                },
                PUT: {
                    "https://guarded-river-66359.herokuapp.com/api/show/594f2ff6edd48a42ffd988ee": [
                        "To change a parameter from the show (Should already exist)",
                        "Expects the desired parameter and its value",
                        "Or a new parameter to be inserted"
                    ],
                    "https://guarded-river-66359.herokuapp.com/api/like/594f2ff6edd48a42ffd988ee":[
                        "To capture a like on a show.",
                        "The show ID needs to be passed",
                        "The likes value is incremented by 1"
                    ]
                },
                DELETE:{
                    "https://guarded-river-66359.herokuapp.com/api/like/594f2ff6edd48a42ffd988ee": [
                        "To delete a show from database",
                        "Expects the show id in the url"
                    ]
                }
            }
        });
    });


    router.route('/shows').
        get(function (req, res) {
            show.find(function (err, shows) {
                if(err)
                    res.json({message: err});
                res.json(shows);
            }).select("name")
        }).
        post(function (req, res) {
            var s = new show({
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description
            });
            s.save(function (err) {
                if(err)
                    res.json({message: err});
                res.json({message: "Saved Successfully"});
            });
        });

    router.route('/show/:sid')
        .get(function (req, res) {
            show.findById(req.params.sid, function (err, sho) {
                if(err)
                    res.json({message: err});
                res.json(sho);
            })
        })
        .put(function (req, res) {
            show.findByIdAndUpdate(req.params.sid,req.body, function (err) {
                if(err)
                    res.json({message:err});
                res.json({message: "Successfully Updated"});
            });
        })
        .delete(function (req,res) {
            show.remove({_id:req.params.sid},function (err) {
                if(err)
                    res.json({message:err});
                res.json({message:"Successfully Deleted!"});
            })
        });

    router.route('/genre/:genre')
        .get(function (req, res) {
            show.find({genre: req.params.genre},function (err, s) {
                if(err)
                    res.json({message: err});
                res.json(s);
            })
        });

    router.get('/title/:title',function (req, res) {
        show.find(
            {name:new RegExp(req.params.title, 'i')},function (err, shows) {
                if(err)
                    res.json({message:err});
                res.json(shows);
            });
    });

    router.put('/like/:sid',function (req, res) {
        show.findByIdAndUpdate(req.params.sid,{$inc: {likes:1} }, function (err) {
            if(err)
                res.json({message: err});
            res.json({message: "Done !"});
        })
    });
    return router;
};