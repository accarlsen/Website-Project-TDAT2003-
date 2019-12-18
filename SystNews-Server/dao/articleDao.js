const Dao = require("./dao");

module.exports = class ArtikkelDao extends Dao{
    getAll(callback){
        super.query("select title,img,date,author,ingress,content,category,rating from testTable", [], callback)
    }

    getOne(id, callback){
        super.query("Select title,img,date,author,ingress,content,category,rating from testTable where id=?",[id],callback)
    }

    put(json,callback){
        var val = [json.id, json.title,json.img,json.date,json.author,json.ingress,json.content,json.category,json.rating]
        super.query("update testTable set title=?,img=?,date=?,author=?,ingress=?,content=?,category=?,rating=?")
    }

    delete(id, callback){
        super.query("delete from testTable where id=?", [id],callback)
    }

    createOne(json,callback){
        var val = [json.title,json.img,json.date,json.author,json.ingress,json.content,json.category,json.rating]
        super.query("insert into testTable (title,img,date,author,ingress,content,category,rating) values (?,?,?,?,?,?,?,?)"
        , val
        , callback
        )
    }

    createOneWithId(json,callback){
        var val = [json.id,json.title,json.img,json.date,json.author,json.ingress,json.content,json.category,json.rating]
        super.query("insert into testTable (id, title,img,date,author,ingress,content,category,rating) values (?,?,?,?,?,?,?,?,?)"
        , val
        , callback
        )
    }
}