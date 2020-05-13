const sql = require("./db.js");

// constructor
const Photo = function(photo) {
    this.uri = photo.uri;
    this.postId = photo.postId;
    this.type = photo.type;
};

Photo.create = (newPhoto, result) => {
    let photoArray = [newPhoto.postId, newPhoto.uri, newPhoto.type];
    sql.query("INSERT INTO Photos(post_id,uri,type) VALUES (?, ?, ?)", photoArray, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created photo: ", { id: res.insertId, ...newPhoto });
        result(null, { id: res.insertId, ...newPhoto });
    });
};

Photo.findById = (photoId, result) => {
    sql.query(`SELECT post_id, uri, type FROM Photos WHERE photo_id = ${photoId}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found photo: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found rating with the id
        result({ kind: "not_found" }, null);
    });
};

Photo.findByPostId = (postId, result) => {
    sql.query(`SELECT * FROM Photos WHERE post_id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Photos: ", res);
            result(null, res);
            return;
        }

        // not found rating with the post id
        result({ kind: "not_found" }, null);
    });
};

Photo.remove = (id, result) => {
    sql.query("DELETE FROM Photos WHERE photo_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Rating with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted photo with id: ", id);
        result(null, res);
    });
};

Photo.removeAll = result => {
    sql.query("DELETE FROM Photos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} photos`);
        result(null, res);
    });
};

Photo.updateById = (id, photo, result) => {
    sql.query(
        "UPDATE Photos SET uri = ? WHERE photo_id = ?",
        [photo.uri, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Post with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated photo: ", { id: id, ...photo });
            result(null, { id: id, ...photo });
        }
    );
};

module.exports = Photo;