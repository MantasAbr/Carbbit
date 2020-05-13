const Photo = require("../models/photo.model.js");
const fs = require('fs');
const path = require('path');

// Create and Save a new Rating
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Request can not be empty!"
        });
    }

    if (!req.body.data) {
        res.status(400).send({
            message: "Photo data not given!"
        });
    }

    let buff = new Buffer(req.body.data, 'base64');
    let timestamp = Date.now();
    let photoPath = './uploads/' + timestamp + '_' + req.body.image_name;
    fs.writeFileSync(photoPath, buff);

    // Create a Rating
    const photo = new Photo({
        postId: req.body.post_id,
        uri: photoPath,
        type: req.body.type
    });

    Photo.create(photo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Photo."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Photo.findById(req.params.photoId, (err, data) => {
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
        } else {
            var fileData = "";
            try {
                fileData = fs.readFileSync(data.uri).toString('base64');
            } catch (e) {
                console.log("Failed to load file: " + data.uri);
            }
            res.send({
                post_id: data.post_id,
                uri: data.uri,
                type: data.type,
                data: fileData
            });
        }
    });
};


exports.findByPostId = (req, res) => {
    Photo.findByPostId(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Photo with post id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving photo with post id " + req.params.postId
                });
            }
        } else {
            data.forEach(function(photo) {
                var fileBase64 = "";
                try {
                    fileBase64 = fs.readFileSync(photo.uri).toString('base64');
                } catch (e) {
                    console.log("Failed to load photo: " + photo.uri);
                }
                photo.data = fileBase64;
            })
            res.send(data);
        }
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let buff = new Buffer(req.body.data, 'base64');
    let timestamp = Date.now();
    let photoPath = './uploads/' + timestamp + '_' + req.body.image_name;
    fs.writeFileSync(photoPath, buff);

    Photo.findById(req.params.photoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found photo with id ${req.params.photoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving photo with id " + req.params.photoId
                });
            }
        } else {
            try {
                fs.unlinkSync(data.uri);
            } catch (e) {
                console.log("Failed to delete file, not found: " + data.uri);
            }
        }
    });

    Photo.updateById(
        req.params.photoId,
        new Photo({
            uri: photoPath
        }),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Photo with id ${req.params.photoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Photo with id " + req.params.photoId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Photo.findById(req.params.photoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found photo with id ${req.params.photoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving photo with id " + req.params.photoId
                });
            }
        } else {
            fs.unlinkSync(data.uri);
        }
    });

    Photo.remove(req.params.photoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Photo with id ${req.params.photoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Photo with id " + req.params.photoId
                });
            }
        } else res.send({ message: `Photo was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join('./uploads', file), err => {
                if (err) {
                    console.log("Failed to delete file");
                }
            });
        }
    });

    Photo.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all photos."
            });
        else res.send({ message: `All photos were deleted successfully!` });
    });
};
