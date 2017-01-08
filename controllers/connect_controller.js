/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/profile', function (req, res) {
    
    return res.redirect('/profile');
});

router.get('/', function (req, res) {
    var current_user;
    models.user.findOne({
        id: req.session.id
    }).then(function(logged_in) {
        current_user = logged_in;
        return models.user.findAll({
            where: {position: logged_in.position, industry: logged_in.industry, level: logged_in.level,
                id: {
                    $ne: logged_in.id
                }
            }
        })  
    })
  .then(function(users) {
   

    return res.render('index', {
        name: req.session.name,
        email:req.session.email,
        photo:req.session.photo,
        logged_in:req.session.logged_in,
        user:users

    });
  });
});



router.post('/update/:id', function(req, res){
   
    models.user.findOne(
    {
    where: { id : req.params.id}
    })
    .then(function(user){
    
    user.friended = req.body.friended;

    res.redirect("/connect");
    })
});


router.delete('/delete/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    models.connect.delete(condition, function() {
        res.redirect('/connect');
    });
});

module.exports = router;
