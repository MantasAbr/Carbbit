const Remembered = require("../models/remembered.model.js");

// Create and Save a new remembered post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request can not be empty!"
        });
    }

    // remember post
    const remembered = new Remembered({
        postId: req.body.post_id,
        userId: req.body.user_id,
    });

    // Save remembered post in the database
    Remembered.create(remembered, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while remembering a post."
            });
        else res.send(data);
    });
};

// Retrieve all users remembered posts from the database.
exports.findAll = (req, res) => {
    Remembered.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single Post with a userId
exports.findByUserId = (req, res) => {
    Remembered.findPostsByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found remembered Post with user id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving post with user id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

    Remembered.remove(req.params.userId, req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Remembered with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Remembered with id " + req.params.userId
                });
            }
        } else res.send({ message: `Remembered was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};