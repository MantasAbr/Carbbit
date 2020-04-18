var express = require('express');
var router = express.Router();
const ratings = require("../controllers/rating.controller.js");

/* GET ratings listing. */
router.get('/', function(request, response) {
  ratings.findAll(request, response);
});

router.post('/', function(request, response) {
  ratings.create(request, response);
})

router.get('/:ratingId', function (request, response) {
  ratings.findOne(request, response)
})

router.get('/post/:postId', function (request, response) {
  ratings.findByPostId(request, response);
})

router.put('/:ratingId', function (request, response) {
  ratings.update(request, response);
})

router.delete('/:ratingId', function (request, response) {
  ratings.delete(request, response);
})

router.delete('/', function (request, response) {
  ratings.deleteAll(request, response);
})

module.exports = router;
