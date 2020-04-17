var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");

/* GET users listing. */
router.get('/', function(request, response) {
  users.findAll(request, response);
});

router.post('/', function(request, response) {
  users.create(request, response);
})

router.get('/:userId', function (request, response) {
  users.findOne(request, response)
})

router.put('/:userId', function (request, response) {
  users.update(request, response);
})

router.delete('/:userId', function (request, response) {
  users.delete(request, response);
})

router.delete('/', function (request, response) {
  users.deleteAll(request, response);
})

module.exports = router;
