/* This is the main API entry point */

const express = require("express"),
    mongoskin = require("mongoskin"),
    logger = require("morgan");

// create the application or server instance 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//  the logger in work 
app.use(logger("dev"));

// start the db
const db = mongoskin.db("@localhost:27017/test", {safe: true});

// For getting the data fron the parma every time the request has that parama
app.param("collectionName", function(req,res,next, colectionName){
    req.collection = db.collection(collectionName);
    return next();
});

/// to be more user fiendly 
app.get("/", function(req,res,next){
    res.send("Please select a collection, eg., /collections/messages");
});

// get the collection
app.get("/collection/:collectionName",function(req,res,next){
    req.collection.find({},{
        limit: 10, sort: {'_id': -1}
    }).toArray(function(e,results){
        if(e) returnnext(e);

        res.send(results);
    });
});

// Creation endpoint in the 
app.post("/collections/:collectionName",function(req,res,next){
    req.collection.insert(req.body, {}, function(e, results){
        if(e) return next(e);
        res.send(results);
    });
});

// find by Id 
app.get("/collection/:collectionName/:id",function(req,res,next){
    req.collection.findById(req.params.id, function(e, result){
        if(e) return next(e);

        res.send(result);
    });
});

// update by Id
app.put("/collection/:collectionName/:id",function(req,res,next){
    req.collection.updateById(req.params.id,
        {$set: req.body},
        {safe: true, multi: false},
        function(e, result){
        if(e) return next(e);

        res.send(result == 1 ? {msg: 'sucess'}: {msg: 'error'});
    });
});

// delete functionality 
app.delete("/collection/:collectionName/:id",function(req,res,next){
    req.collection.removeById(req.params.id, function(e, result){
        if(e) return next(e);

        res.send(result == 1 ? {msg: 'sucess'}: {msg: 'error'});
    });
});

app.listen(3000, function(){
    console.log("Express server listening on port 3000");
});