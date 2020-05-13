var express = require('express');
var router = express.Router();
const photo = require("../controllers/photo.controller.js");

router.post('/', function(request, response) {
  photo.create(request, response);
})

router.get('/:photoId', function (request, response) {
  photo.findOne(request, response);
})

router.get('/post/:postId', function (request, response) {
  photo.findByPostId(request, response);
})

router.put('/:photoId', function (request, response) {
  photo.update(request, response);
})

router.delete('/:photoId', function (request, response) {
  photo.delete(request, response);
})

router.delete('/', function (request, response) {
  photo.deleteAll(request, response);
})

module.exports = router;
