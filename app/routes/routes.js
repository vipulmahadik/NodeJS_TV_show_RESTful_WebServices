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
        res.json({message: "Everything working great!"});
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

    router.get('/like/:sid',function (req, res) {
        show.findByIdAndUpdate(req.params.sid,{$inc: {likes:1} }, function (err) {
            if(err)
                res.json({message: err});
            res.json({message: "Done !"});
        })
    });
    return router;
};