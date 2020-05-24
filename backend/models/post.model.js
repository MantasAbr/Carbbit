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

const Filter = function(filter){
    this.priceFrom = filter.priceFrom;
    this.priceTo = filter.priceTo;
    this.brand = filter.brand;
    this.model = filter.model;
    this.locationCity = filter.locationCity;
}

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

Filter.findByFilters = (priceFrom, priceTo, brand, model, locationCity, result) => {
    
    var query = `SELECT * FROM Posts WHERE `;
    var add = false;

    if (priceFrom !== ''){
        add = true;
        query += ` price >= '${priceFrom}' `
    }
    if (priceTo !== ''){
        if (add)
            query += ` AND price <= '${priceTo}' `
        else{
            query += ` price <= '${priceTo}' `
            add = true;
        }
    }
    if (brand !== ''){
        if (add)
            query += ` AND brand = '${brand}' `
        else{
            query += ` brand = '${brand}' `
            add = true;
        }
    }
    if (model !== ''){
        if (add)
            query += ` AND model = '${model}' `
        else{
            query += ` model = '${model}' `
            add = true;
        }
    }
    if (locationCity !== ''){
        if (add)
            query += ` AND location_city = '${locationCity}' `
        else {
            query += ` location_city = '${locationCity}' `
            add = true;
        }
    }
    if (add)
        query += ` AND is_private = 0 `
    else
        query += ` is_private = 0 `

    /*
        conditioning, there's gotta be a better way... oh well
        Dieve atleisk mums mūsų spagėčius, kaip ir mes atleidžiame kitų spagėčius
    */
    /*
    //priceFrom
    if (priceFrom !== '' &&
        brand === '' && priceTo === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND is_private = 0`;
    //priceTo
    else if (priceTo !== '' &&
        brand === '' && priceFrom === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceTo}' AND is_private = 0`;
    //priceTo AND priceFrom
    else if (priceTo !== '' && priceFrom !== '' &&
        brand === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND price <= '${priceTo}' AND is_private = 0`;
    // brand
    else if (brand !== '' &&
        priceFrom === '' && priceTo === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE brand = '${brand}' AND is_private = 0`;
    //priceTo and brand
    else if (priceTo !== '' && brand !== '' && 
        priceFrom === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceTo}' AND brand = '${brand}' AND is_private = 0`;
    //priceFrom and brand
    else if (priceFrom !== '' && brand !== '' && 
        priceTo === '' && model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceFrom}' AND brand = '${brand}' AND is_private = 0`;
    //priceFrom AND priceTo AND brand
    else if (priceFrom !== '' && brand !== '' && priceTo !== '' && 
        model === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND price <= '${priceTo}' brand = '${brand}' AND is_private = 0`;
    //model
    else if (model !== '' &&  
        priceFrom === '' && brand === '' && priceTo === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE model = '${model}' AND is_private = 0`;
    //brand AND model
    else if ( brand !== '' && model !== '' &&
        priceFrom === '' && priceTo === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE brand = '${brand}' AND model = '${model}' AND is_private = 0`;     
    //priceFrom AND model
    else if (priceFrom !== '' && model !== '' &&  
        brand === '' && priceTo === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND model = '${model}' AND is_private = 0`;
    //priceTo AND model
    else if (priceTo !== '' && model !== '' &&
        brand === '' && priceTo === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceTo}' AND model = '${model}' AND is_private = 0`;
    //priceFrom AND priceTo AND model
    else if (priceTo !== '' && priceFrom !== '' && model !== '' &&  
        brand === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND price <= '${priceTo}' model = '${model}' AND is_private = 0`;
    //priceFrom AND brand AND model
    else if (priceFrom !== '' &&  brand !== '' && model !== '' &&
        priceTo === '' && locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND brand = '${brand}' AND model = '${model}' AND is_private = 0`;
    //priceFrom AND priceTo AND brand AND model
    else if (priceTo !== '' && priceFrom !== '' &&  brand !== '' && model !== '' &&
        locationCity === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND price <= '${priceTo}' AND brand = '${brand}' AND model = '${model}' AND is_private = 0`;
    // location
    else if (locationCity !== '' &&
        priceTo === '' && priceFrom === '' &&  brand === '' && model === '')
        query = `SELECT * FROM Posts WHERE location_city = '${locationCity}' AND is_private = 0`;
    // priceFrom AND location
    else if (priceFrom !== '' && locationCity !== '' &&
        priceTo === '' &&   brand === '' && model === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceTo AND location
    else if (priceFrom !== '' && locationCity !== '' &&
        priceTo === '' &&   brand === '' && model === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceTo}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceFrom AND priceTo AND location
    else if (priceFrom !== '' && locationCity !== '' &&
        priceTo === '' &&   brand === '' && model === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND price <= '${priceTo}' AND location_city = '${locationCity}' AND is_private = 0`;
    // brand AND location
    else if (brand !== '' && locationCity !== '' &&
        priceTo === '' && priceFrom === '' && model === '')
        query = `SELECT * FROM Posts WHERE brand = '${brand}' AND location_city = '${locationCity}' AND is_private = 0`;    
    // brand AND model AND location
    else if (brand !== '' && locationCity !== '' && model !== '' &&
        priceTo === '' && priceFrom === '')
        query = `SELECT * FROM Posts WHERE brand = '${brand}' AND model = '${model}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceFrom AND brand AND location
    else if (priceFrom !== '' && brand !== '' && locationCity !== '' && 
        priceTo === '' && model === '')
        query = `SELECT * FROM Posts WHERE price >= '${priceFrom}' AND brand = '${brand}' AND model = '${model}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceTo AND brand AND location
    else if (brand !== '' && locationCity !== '' && model !== '' &&
        priceTo === '' && priceFrom === '')
        query = `SELECT * FROM Posts WHERE price <= '${priceTo}' AND brand = '${brand}' AND model = '${model}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceFrom AND model AND location
    else if (brand !== '' && locationCity !== '' && model !== '' &&
        priceTo === '' && priceFrom === '')
        query = `SELECT * FROM Posts WHERE brand = '${brand}' AND location_city = '${locationCity}' AND is_private = 0`;
    // priceTo AND model AND location
    // priceFrom AND priceTo AND model AND location
    // priceFrom AND priceTo AND brand AND location
    // priceFrom AND priceTo AND brand AND model AND location

    */
    sql.query(`SELECT * FROM Posts WHERE brand = '${brand}' OR model = '${model}' OR location_city = '${locationCity}' AND is_private = 0`, (err, res) => {
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