var mysql = require("mysql");
const runsqlfile = require("./runsqlfile.js");
const ArtikkelDao = require("./articleDao");

var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let artikkelDao = new ArtikkelDao(pool);

beforeAll(done => {
    runsqlfile("./dao/create_test_table.sql", pool, () => {
        runsqlfile("./dao/create_test_data.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("Get one article from db", done => {
    function callBack(status, data) {
        console.log("Test callback, status: " + status + ", data: " + JSON.stringify(data));
        expect(data.length).toBe(1);
        done();
    }
    artikkelDao.getOne(2, callBack);
})

test("Get unknown article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback, status: " + status + ", data: " + JSON.stringify(data)
        )
        expect(data.length).toBe(0)
        done();
    }
    artikkelDao.getOne(0, callback)
})

test("Add article to db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }
    artikkelDao.createOne({
        title: "test3", img: "test3", date: "test3", author: "test3", ingress: "test3", content: "test3", category: "test3", rating: 2
    }, callback)
})

test("Get all articles from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2)
        done()
    }
    artikkelDao.getAll(callback)
})

test("Delete a article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1)
        done()
    }
    artikkelDao.createOneWithId({
        id: 1, title: "test3", img: "test3", date: "test3", author: "test3", ingress: "test3", content: "test3", category: "test3", rating: 2
    }, callback)
    artikkelDao.delete(1, callback)
})