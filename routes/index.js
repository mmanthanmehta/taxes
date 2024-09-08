var express = require('express');
var router = express.Router();
const userModel = require("./users.js")
const localStrangy = require('passport-local');
const passport = require('passport');

passport.use(new localStrangy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/profile',function(req, res, next) {
  res.render("profile");
});

router.get('/income',function(req, res, next) {
  res.render("incometax");
});


router.get('/corporate',function(req, res, next) {
  res.render("corporate");
});

router.get('/capital',function(req, res, next) {
  res.render("capital");
});

router.get('/gst',function(req, res, next) {
  res.render("gst");
});

router.get('/custom',function(req, res, next) {
  res.render("custom");
});

router.get('/wealth',function(req, res, next) {
  res.render("wealth");
});

router.get('/quiz',function(req, res, next) {
  res.render("quiz");
});

router.get('/more',function(req, res, next) {
  res.render("more");
});

router.post('/register',function(req,res){
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  })
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){res.redirect('/profile')
    })
  })
})

router.get('/loginn',function(req, res, next) {
  res.render("login");
});

router.post('/login', passport.authenticate('local',{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){
})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err) {return next(err)}
    res.redirect('/')
  })
})

function isLogIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

module.exports = router;
