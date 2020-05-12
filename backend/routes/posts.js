var express = require('express');
var router = express.Router();
const posts = require("../controllers/post.controller.js");

/* GET posts listing. */
router.get('/', function(request, response) {
  posts.findAll(request, response);
});

router.post('/', function(request, response) {
  posts.create(request, response);
})

router.get('/:postId', function (request, response) {
  posts.findOne(request, response);
})

router.get('/filterBrand/:brand', function (request, response) {
  posts.findByBrand(request, response);
})

router.get('/user/:userId', function (request, response) {
  posts.findByUserId(request, response);
})

router.put('/:postId', function (request, response) {
  posts.update(request, response);
})

router.delete('/:postId', function (request, response) {
  posts.delete(request, response);
})

router.delete('/', function (request, response) {
  posts.deleteAll(request, response);
})

module.exports = router;
