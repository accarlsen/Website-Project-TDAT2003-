var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var pool = mysql.createPool({
    connectionLimit: 20,
    host: "________",
    user: "________",
    password: "________",
    database: "________",
    debug: false
});

app.get("/article", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
            res.status(500);
        } else {
            connection.query(
                "select id, title, img, author, date, ingress, content, category, rating, alttext from article",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                        res.status(404);
                    } else {
                        console.log(rows);
                        res.json(rows);
                        res.status(200);
                    }
                }
            );
        }
    });
});

app.get("/article/last", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
            res.status(500);
        } else {
            connection.query(
                "select id, title, img, author, date, ingress, content, category, rating, alttext from article ORDER BY id DESC LIMIT 1 ",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                        res.status(404);
                    } else {
                        console.log(rows);
                        res.json(rows);
                        res.status(200);
                    }
                }
            );
        }
    });
});

app.get("/article/:id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
            res.status(500);
        } else {
            connection.query(
                "select id, title, img, author, date, ingress, content, category, rating, alttext from article where id=?", [req.params.id],
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                        res.status(404);
                    } else {
                        console.log(rows);
                        res.json(rows);
                        res.status(200);
                    }
                }
            );
        }
    });
});

app.post("/article", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
            res.status(500);
        } else {
            console.log("Fikk databasekobling");
            console.log(req.body);
            var val = [req.body.title, req.body.img, req.body.author, req.body.date, req.body.ingress, req.body.content, req.body.category, req.body.rating, req.body.alttext];
            connection.query(
                "insert into article (title, img, author, date, ingress, content, category, rating, alttext) values (?,?,?,?,?,?,?,?,?)",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.status(201);
                    }
                }
            );
        }
    });
});

app.put("/article/:id", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    console.log("Navn: " + req.body.navn);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
            res.status(500);
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.img, req.body.author, req.body.date, req.body.ingress, req.body.content, req.body.category, req.body.rating, req.body.alttext, req.params.id];
            connection.query(
                "update article set title=?, img=?, author=?, date=?, ingress=?, content=?, category=?, rating=? alttext=? where id=?",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        res.status(404);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                        res.status(200);
                    }
                }
            );
        }
    });
});

app.delete("/article/:id", (req, res) => {
    console.log("Fikk request fra klienten");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "Feil ved oppkobling" });
            res.status(500)
        } else {
            console.log("Fikk databasekobling");
            connection.query(
                "delete from article where id=?", [req.params.id],
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                        res.status(404);
                     /*if(rows.changedRows() == 0){
                        res.json({error : "Id not found"});
                        res.status(404);*/
                    } else {
                        console.log(rows);
                        res.json(rows);
                        res.status(200);
                    }
                }
            );
        }
    });
});

var server = app.listen(3001);
console.log("server started");