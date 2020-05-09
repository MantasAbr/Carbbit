const sql = require("./db.js");

// constructor
const Remembered = function(remembered) {
    this.postId = remembered.postId
    this.userId = remembered.userId;
};

Remembered.create = (newRemembered, result) => {
    let rememberedArray = [newRemembered.postId, newRemembered.userId];
    sql.query('INSERT INTO Remembered (post_id , user_id) VALUES (?, ?)', rememberedArray, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created post: ", { id: res.insertId, ...newRemembered });
        result(null, { id: res.insertId, ...newRemembered });
    });
};

Remembered.findByUserId = (userId, result) => {
    sql.query(`SELECT * FROM Remembered WHERE user_id = ${userId}`, (err, res) => {
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

        // not found remembered Post with the user id
        result({ kind: "not_found" }, null);
    });
};

Remembered.findPostsByUserId = (userId, result) => {
    sql.query(`SELECT * FROM Posts WHERE post_id IN (SELECT post_id FROM Remembered WHERE user_id = ${userId})`, (err, res) => {
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

        // not found remembered Post with the user id
        result({ kind: "not_found" }, null);
    })
}

Remembered.getAll = result => {
    sql.query("SELECT * FROM Remembered", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Remembered.remove = (user_id, post_id, result) => {
    sql.query("DELETE FROM Remembered WHERE post_id = ? AND user_id = ?", [post_id, user_id], (err, res) => {
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

        console.log("deleted remembered with id: ", post_id);
        result(null, res);
    });
};

Remembered.removeAll = result => {
    sql.query("DELETE FROM Remembered", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Remembered`);
        result(null, res);
    });
};

module.exports = Remembered;