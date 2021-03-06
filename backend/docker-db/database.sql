    CREATE TABLE IF NOT EXISTS Users (
        user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        first_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Posts (
        post_id int AUTO_INCREMENT,
        picture_uri varchar(255) NOT NULL,
        body varchar(255) NOT NULL,
        available_from_date DATETIME NOT NULL,
        available_to_date DATETIME NOT NULL,
        brand varchar(255) NOT NULL,
        model varchar(255) NOT NULL,
        is_private BIT NOT NULL,
        price int NOT NULL,
        location_city varchar(255) NOT NULL,
        location_address varchar(255) NOT NULL,
        in_use BIT NOT NULL,
        user_id int NOT NULL, PRIMARY KEY (post_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

    CREATE TABLE IF NOT EXISTS Photos (
        photo_id int AUTO_INCREMENT PRIMARY KEY,
        post_id int NOT NULL,
        uri varchar(255) NOT NULL,
        type varchar(255) NOT NULL,
        FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    );

    CREATE TABLE IF NOT EXISTS Ratings (
        rating_id int AUTO_INCREMENT,
        rating int NOT NULL,
        post_id int NOT NULL,
        PRIMARY KEY (rating_id),
        FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    );

    CREATE TABLE IF NOT EXISTS Remembered (
        remembered_id int AUTO_INCREMENT,
        post_id int NOT NULL,
        user_id int NOT NULL,
        PRIMARY KEY (remembered_id),
        FOREIGN KEY (post_id) REFERENCES Posts(post_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

    INSERT INTO Users (first_name, email, password )
    VALUES
    ('iksd', 'iksd@gmail.com', 'slaptazodis5'),
    ('Laurynas', 'Laurynas@gmail.com', 'slaptazodis'),
    ('Lukas', 'Lukas@gmail.com', 'slaptazodis'),
    ('Mantas', 'Mantas@gmail.com', 'slaptazodis5'),
    ('Nedas', 'Nedas@gmail.com', 'slaptazodis5'),
    ('Paulius', 'Paulius@gmail.com', 'slaptazodis5');

    INSERT INTO Posts (picture_uri , body, available_from_date, available_to_date, brand, model, is_private, price, location_city, location_address, in_use, user_id)
    VALUES
    ('image/jpeg;base1', 'aprasymas', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() , 'BMW' , 'E46', 1, 10.00, 'KAUNAS', '', 1, 1),
    ('image/jpeg;base2', 'aprasymas', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() , 'Audi' , 'A6' , 0, 12.00, 'VILNIUS', '', 0, 2),
    ('image/jpeg;base3', 'aprasymas', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() , 'Audi' , 'A7' , 0, 15.00, 'KLAIPEDA', '', 1, 3),
    ('image/jpeg;base4', 'aprasymas', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() , 'Audi' , 'A3' , 0, 8.00, 'KAUNAS', '', 0, 4),
    ('image/jpeg;base5', 'aprasymas', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() , 'Audi' , 'A6' , 0, 5.00, 'SIAULIAI', '', 1, 5);

    INSERT INTO Ratings (rating, post_id)
    VALUES
    (5, 3),
    (4, 1),
    (5, 3),
    (5, 2),
    (5, 3);

    INSERT INTO Remembered(post_id, user_id)
    VALUES
    (5, 1),
    (3, 1),
    (4, 2),
    (5, 2),
    (2, 5);
