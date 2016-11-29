/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models');

// router.get('/friend', function (req, res) {
    
//     return res.redirect('/friend');
// });
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
    // var candidates =[];
    // for ()

    return res.render('index', {
        name: req.session.name,
        email:req.session.email,
        photo:req.session.photo,
        logged_in:req.session.logged_in,
        user:users

    });
  });
});


// router.post('/create', function(req, res) {
  
//     models.user.
//     // models.connect.create({
//     //     friender_id: req.session.id,
//     //     friended_id: req.user.id,
//     //     accepted: true
        
//     }).then(function(){
       
//         res.redirect('/');
//     });
// });

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
// router.put('/update/:id', function(req, res) {
//     var condition = 'id = ' + req.params.id;

//     console.log('condition', condition);

//     models.user.update({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         age: req.body.age,
//         company: req.body.company,
//         position: req.body.position,
//         industry: req.body.industry,
//         level: req.body.level,
//         photo_url: req.body.photo
//     }, condition, function() {
//         res.redirect('/');
//     });
// });

router.delete('/delete/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    models.connect.delete(condition, function() {
        res.redirect('/connect');
    });
});

module.exports = router;
