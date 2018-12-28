var express = require('express');
var router = express.Router();

var user = require('../api/controller/authorizationController')
/* GET home page. */

router.get('/', async function (req, res, next) {
  var email = await user.authorizationUser(req, res, next)
  res.render('index', { title: 'Home', email: email.email });
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', });
});

router.get('/create', async function (req, res, next) {
  var email = await user.authorizationUser(req, res, next)
  if (!email) {
    res.render('login', { title: 'Create Movie', email: email.email })
  } else {
    res.render('create', { title: 'Create Movie', email: email.email })
  }
});

router.get('/list', function (req, res, next) {
  res.render('list', { title: 'List', email: email || '' })
});

router.get('/logout', function (req, res, next) {
  if (req.session.token != undefined) {
    req.session.token = undefined
  }
  res.render('login', { title: 'Logout' })
})
module.exports = router;
