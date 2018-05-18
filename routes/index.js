var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tokyo', function(req, res, next) {
  res.render('tokyo', { title: 'Tokyo Land' });
});

module.exports = router;
