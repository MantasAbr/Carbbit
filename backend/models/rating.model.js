const sql = require("./db.js");

// constructor
const Rating = function(rating) {
    this.rating = rating.rating;
    this.postId = rating.postId;
};

Rating.create = (newRating, result) => {
    let ratingArray = [newRating.rating, newRating.postId];
    sql.query("INSERT INTO Ratings(rating, post_id) VALUES (?, ?)", ratingArray, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created rating: ", { id: res.insertId, ...newRating });
        result(null, { id: res.insertId, ...newRating });
    });
};

Rating.findById = (ratingId, result) => {
    sql.query(`SELECT rating, post_id FROM Ratings WHERE rating_id = ${ratingId}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found rating: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found rating with the id
        result({ kind: "not_found" }, null);
    });
};

Rating.findByPostId = (postId, result) => {
    sql.query(`SELECT * FROM Ratings WHERE post_id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Rating: ", res);
            result(null, res);
            return;
        }

        // not found rating with the post id
        result({ kind: "not_found" }, null);
    });
};

Rating.getAll = result => {
    sql.query("SELECT rating, post_id FROM Ratings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Rating.updateById = (id, rating, result) => {
    sql.query(
        "UPDATE Ratings SET rating = ? WHERE rating_id = ?",
        [rating.rating, id],
        (err, res) => {
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

            console.log("updated rating: ", { id: id, ...rating });
            result(null, { id: id, ...rating });
        }
    );
};

Rating.remove = (id, result) => {
    sql.query("DELETE FROM Ratings WHERE rating_id = ?", id, (err, res) => {
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

        console.log("deleted rating with id: ", id);
        result(null, res);
    });
};

Rating.removeAll = result => {
    sql.query("DELETE FROM Ratings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ratings`);
        result(null, res);
    });
};

module.exports = Rating;