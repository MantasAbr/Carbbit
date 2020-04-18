const Rating = require("../models/rating.model.js");

// Create and Save a new Rating
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request can not be empty!"
        });
    }

    // Create a Rating
    const rating = new Rating({
        rating: req.body.rating,
        postId: req.body.post_id,
    });

    // Save Rating in the database
    Rating.create(rating, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Rating."
            });
        else res.send(data);
    });
};

// Retrieve all Ratings from the database.
exports.findAll = (req, res) => {
    Rating.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Ratings."
            });
        else res.send(data);
    });
};

// Find a single Rating with a ratingId
exports.findOne = (req, res) => {
    Rating.findById(req.params.ratingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.ratingId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.ratingId
                });
            }
        } else res.send(data);
    });
};

// Find a single Rating with a postId
exports.findByPostId = (req, res) => {
    Rating.findByPostId(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Rating with Post id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Rating with Post id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

// Update a Rating identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Rating.updateById(
        req.params.ratingId,
        new Rating({
            rating: req.body.rating,
            postId: req.body.post_id,
        }),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Rating with id ${req.params.ratingId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Rating with id " + req.params.ratingId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Rating with the specified ratingId in the request
exports.delete = (req, res) => {
    Rating.remove(req.params.ratingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Rating with id ${req.params.ratingId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete rating with id " + req.params.ratingId
                });
            }
        } else res.send({ message: `Rating was deleted successfully!` });
    });
};

// Delete all Ratings from the database.
exports.deleteAll = (req, res) => {
    Rating.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Ratings."
            });
        else res.send({ message: `All Ratings were deleted successfully!` });
    });
};