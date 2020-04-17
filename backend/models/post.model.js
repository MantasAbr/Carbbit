const sql = require("./db.js");

// constructor
const Post = function(post) {
    this.pictureUri = post.pictureUri;
    this.body = post.body;
    this.availableDate = post.availableDate;
    this.userId = post.userId;
};

Post.create = (newPost, result) => {
    let postArray = [newPost.pictureUri, newPost.body, newPost.availableDate, newPost.userId];
    sql.query("INSERT INTO Posts(picture_uri, body, available_date, user_id ) VALUES (?, ?, ?, ?)", postArray, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM Posts WHERE post_id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Post: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Post with the id
        result({ kind: "not_found" }, null);
    });
};

Post.findByUserId = (userId, result) => {
    sql.query(`SELECT * FROM Posts WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Post: ", res);
            result(null, res);
            return;
        }

        // not found Post with the user id
        result({ kind: "not_found" }, null);
    });
};

Post.getAll = result => {
    sql.query("SELECT * FROM Posts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE Posts SET picture_uri = ?, body = ?, available_date = ?, user_id = ? WHERE post_id = ?",
        [post.pictureUri, post.body, post.availableDate, post.userId, id],
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

            console.log("updated post: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.remove = (id, result) => {
    sql.query("DELETE FROM Posts WHERE post_id = ?", id, (err, res) => {
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

        console.log("deleted post with id: ", id);
        result(null, res);
    });
};

Post.removeAll = result => {
    sql.query("DELETE FROM Posts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Posts`);
        result(null, res);
    });
};

module.exports = Post;