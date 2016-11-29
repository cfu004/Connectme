var express = require('express');
var router = express.Router();
var models = require('../models');

// router.get('/', function (req, res) {
    
//     return res.render('connect/profile', {
//     	name: req.session.name,
//     	lastname: req.session.lastname,
//     	photo: req.session.photo
//     });
// });

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

    return res.render('connect/profile', {
    	name: req.session.name,
    	lastname: req.session.lastname,
    	photo: req.session.photo,
    	user:users
    });
   });
 });
// router.post('/', function (req, res) {
// 	return res.render('connect/profile');
// })

module.exports = router;