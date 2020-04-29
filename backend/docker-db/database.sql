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
    available_date DATETIME NOT NULL,
    user_id int NOT NULL, PRIMARY KEY (post_id),
    private bool NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Ratings (
    rating_id int AUTO_INCREMENT,
    rating int NOT NULL,
    post_id int NOT NULL,
    PRIMARY KEY (rating_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

INSERT INTO Users (first_name, email, password )
VALUES
('iksd', 'iksd@gmail.com', 'slaptazodis5'),
('Laurynas', 'Laurynas@gmail.com', 'slaptazodis'),
('Lukas', 'Lukas@gmail.com', 'slaptazodis'),
('Mantas', 'Mantas@gmail.com', 'slaptazodis5'),
('Nedas', 'Nedas@gmail.com', 'slaptazodis5'),
('Paulius', 'Paulius@gmail.com', 'slaptazodis5');

INSERT INTO Posts (picture_uri , body, available_date, user_id, private)
VALUES
('image/jpeg;base1', 'aprasymas', CURRENT_TIMESTAMP() , 1, true),
('image/jpeg;base2', 'aprasymas', CURRENT_TIMESTAMP() , 2, true),
('image/jpeg;base3', 'aprasymas', CURRENT_TIMESTAMP() , 3, true),
('image/jpeg;base4', 'aprasymas', CURRENT_TIMESTAMP() , 4, true),
('image/jpeg;base5', 'aprasymas', CURRENT_TIMESTAMP() , 5, true);

INSERT INTO Ratings (rating, post_id)
VALUES
(5, 3),
(4, 1),
(5, 3),
(5, 2),
(5, 3);