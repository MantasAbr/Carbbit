const sql = require("./db.js");

// constructor
const User = function(user) {
    this.firstName = user.firstName;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    let userArray = [newUser.firstName, newUser.email, newUser.password];
    sql.query("INSERT INTO Users(first_name, email, password ) VALUES (?, ?, ?)", userArray, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT user_id, first_name, email FROM Users WHERE user_id = ${userId}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT user_id, first_name, email FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE Users SET first_name = ?, email = ?, password = ? WHERE user_id = ?",
        [user.firstName, user.email, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {


    sql.query("DELETE FROM Users WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            console.log('kazkas')
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = User;