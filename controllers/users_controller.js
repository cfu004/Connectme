var bcrypt = require('bcryptjs');
var models = require('../models');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    console.log(res);
    res.render('connect/signup');

});

router.get('/log_out', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/')
    })
});


// login
router.post('/log_in', function(req, res) {
    models.user.findOne({
        where: {
            email: req.body.email //query database searching for logged in email
        }
    }).then(function(user) {

        if (user == null) {
            res.redirect('/')
        }


        bcrypt.compare(req.body.password, user.password_hash, function(err, result) {

            if (result == true) {


                req.session.logged_in = true;

                req.session.name = user.firstname;

                req.session.lastname = user.lastname;

                req.session.id = user.id;

                req.session.email = user.email;

                req.session.photo = user.photo_url;
                console.log("=========================================================");

                res.redirect('/connect');

            } else {
                res.redirect('/');
            }
        });
    })
});


router.post('/register', function(req, res) {
    models.user.findAll({
        where: {
            email: req.body.email //query database searching for logged in email
        }
    }).then(function(users) {

        if (users.length > 0) {
            console.log(users) //if found in database, the email has been registered
            res.send('we already have an email or username for this account')
        } else {

            bcrypt.genSalt(10, function(err, salt) { //if not, let user to register with this email address
                bcrypt.hash(req.body.password, salt, function(err, hash) {


                    models.user.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password_hash: hash,
                            age: req.body.age,
                            company: req.body.company,
                            position: req.body.position,
                            industry: req.body.industry,
                            level: req.body.level,
                            photo_url: req.body.photo
                        })

                        .then(function(user) {



                            req.session.logged_in = true;

                            req.session.username = user.name;

                            req.session.id = user.id;

                            req.session.user_email = user.email;


                            res.redirect('/');
                        });
                });
            });

        }
    });
});




module.exports = router;