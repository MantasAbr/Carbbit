const sql = require("./db.js");

// constructor
const Post = function(post) {
    this.pictureUri = post.pictureUri;
    this.body = post.body;
    this.availableToDate = post.availableToDate;
    this.availableFromDate = post.availableFromDate;
    this.brand = post.brand;
    this.model = post.model;
    this.isPrivate = post.isPrivate;
    this.price = post.price;
    this.locationCity = post.locationCity;
    this.locationAddress = post.locationAddress;
    this.inUse = post.inUse;
    this.userId = post.userId;
};

Post.create = (newPost, result) => {
    console.log(newPost.isPrivate)
    let postArray = [newPost.pictureUri, newPost.body, newPost.availableToDate, newPost.availableFromDate, newPost.brand, newPost.model, newPost.isPrivate, newPost.price, newPost.locationCity, newPost.locationAddress, newPost.inUse, newPost.userId];
    sql.query('INSERT INTO Posts (picture_uri , body, available_from_date, available_to_date, brand, model, is_private, price, location_city, location_address, in_use, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', postArray, (err, res) => {
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
    sql.query(`SELECT * FROM Posts WHERE post_id = ${postId} AND is_private = 0`, (err, res) => {
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

Post.findByBrand = (brand, result) => {
    sql.query(`SELECT * FROM Posts WHERE brand = '${brand}' AND is_private = 0`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Posts: ", res);
            result(null, res);
            return;
        }

        // not found Post with such brand
        result({ kind: "not_found" }, null);
    });
}

Post.getAll = result => {
    sql.query("SELECT * FROM Posts WHERE is_private = 0", (err, res) => {
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
        "UPDATE Posts SET picture_uri = ?, body = ?, available_from_date = ?, available_to_date = ?, brand = ?, model = ?, is_private = ?, price = ?, location_city = ?, location_address = ?, in_use = ? WHERE post_id = ?",
        [post.pictureUri, post.body, post.availableFromDate, post.availableToDate, post.brand, post.model, post.isPrivate, post.price, post.locationCity, post.locationAddress, post.inUse, id],
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