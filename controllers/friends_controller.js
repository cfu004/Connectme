var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/connect', function (req, res) {
    
    return res.redirect('/connect');
});

router.get('/', function (req, res) {
      return models.user.getFriender().concat(user.getFriended())
  .then(function(user) {
    return res.render('friends', {
       user:user
    });
  });
});

router.post('/create', function(req, res) {
  

    models.connect.create({
        friender_id: req.session.id,
        friended_id: req.user.id,
        accepted: true
        
    }).then(function(){
        res.redirect('/');
    });
});

router.put('/update/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    models.user.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        company: req.body.company,
        position: req.body.position,
        industry: req.body.industry,
        level: req.body.level,
        photo_url: req.body.photo
    }, condition, function() {
        res.redirect('/');
    });
});

router.delete('/delete/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    models.connect.delete(condition, function() {
        res.redirect('/');
    });
});

module.exports = router;