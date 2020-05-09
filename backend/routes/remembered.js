var express = require('express');
var router = express.Router();
const remembered = require("../controllers/remembered.controller.js");

/* GET remembered listing. */
router.get('/', function(request, response) {
  remembered.findAll(request, response);
});

router.get('/:userId', function (request, response) {
  remembered.findByUserId(request, response);
})

router.post('/', function(request, response) {
  remembered.create(request, response);
})

router.delete('/:userId/:postId', function (request, response) {
  remembered.delete(request, response);
})

router.delete('/', function (request, response) {
  remembered.deleteAll(request, response);
})

module.exports = router;
