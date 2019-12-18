DROP TABLE testTable;

CREATE TABLE testTable(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(256) NOT NULL,
    img VARCHAR (256) NOT NULL,
    date VARCHAR(32) NOT NULL,
    author VARCHAR(64) NOT NULL,
    ingress VARCHAR(256) NOT NULL,
    content VARCHAR(2046) NOT NULL,
    category VARCHAR(30) NOT NULL,
    rating INT(4) NOT NULL,
    PRIMARY KEY (id)
);