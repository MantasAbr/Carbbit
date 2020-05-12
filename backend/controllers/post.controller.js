const Post = require("../models/post.model.js");

// Create and Save a new posts
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request can not be empty!"
        });
    }

    // Create a Post
    const post = new Post({
        pictureUri: req.body.picture_uri,
        body: req.body.body,
        availableToDate: req.body.available_from_date,
        availableFromDate: req.body.available_to_date,
        brand: req.body.brand,
        model: req.body.model,
        isPrivate: req.body.is_private,
        userId: req.body.user_id,
        private: req.body.private,
    });

    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

// Find a single Post with a userId
exports.findByUserId = (req, res) => {
    Post.findByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with user id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving post with user id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Find (filter) all Posts with given brand
exports.findByBrand = (req, res) => {
    Post.findByBrand(req.params.brand, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with such brand ${req.params.brand}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving post with brand " + req.params.brand
                });
            }
        } else res.send(data);
    })
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Post.updateById(
        req.params.postId,
        new Post({
            pictureUri: req.body.picture_uri,
            body: req.body.body,
            availableFromDate: req.body.available_from_date,
            availableToDate: req.body.available_to_date,
            brand: req.body.brand,
            model: req.body.model,
            isPrivate: req.body.is_private,
            userId: req.body.user_id,
        }),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.postId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + req.params.postId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + req.params.postId
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Post.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all posts."
            });
        else res.send({ message: `All posts were deleted successfully!` });
    });
};