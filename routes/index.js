var express = require('express');
var router = express.Router();

var authorUser = require('../api/controller/authorUser')
var userController = require('../api/controller/userController')
/* GET home page. */

router.get('/', async function (req, res, next) {
  var email = {}
  var token = {}
  if (req.session.token) {
    token = req.session.token
    email = await authorUser.authorizationUser(token)
  }
  res.render('index', { title: 'Home', email: email , token: token });
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', });
});

router.get('/create', async function (req, res, next) {
  if(req.session.token) {
    var token = req.session.token
    var decoded = await authorUser.authorizationUser(token)
  }
  if (!decoded) {
    res.render('login', { title: 'Create Movie', })
  } else {
    res.render('create', { title: 'Create Movie', email: decoded.email })
  }
});

router.get('/logout', function (req, res, next) {
  res.render('login', { title: 'Logout' })
})

router.get('/detail/:id', function (req, res, next) {
  var id = req.params.id
  res.render('detail', { title: 'Detail', id: id })
})

router.get('/profile', async function (req, res, next) {
  var email = {}
  var token = {}
  if (req.session.token) {
    token = req.session.token
    email = await authorUser.authorizationUser(token)
  }
  res.render('profile', { title: 'Infor', email: email, token: token})
})

router.get('/modify/:token', async function (req, res, next) {
  var token = req.params.token
  var user = await authorUser.authorizationUser(req, res, next, token);
  res.render('profile', { title: 'Infor', user: user.user, token: token })
})

module.exports = router;
