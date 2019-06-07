var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var db = [];
var idcount = 0;

app.get("/todos", (req, res, next) => {
    res.json(db);
});


app.get("/todos/:todoID", (req, res, next) => {
    console.log("looking for " + req.params.todoID);
    let id= parseInt(req.params.todoID);

    let todo = db.find(td => td.id === id);

    if (todo) {
        res.send(todo);
    } else {
        res.status(404);
        res.send({msg: "not found"});
    }
});



app.post("/todos/:todoID/done", (req, res, next) => {
    let id= parseInt(req.params.todoID);
    let todo = db.find(td => td.id === id)
    if (todo) {
        todo.status = "DONE";
        res.send(todo);
    } else {
        res.status(404);
        res.send({msg: "not found"});
    }
});



app.post("/todos", (req, res, next) => {
    let body = {
        action:req.body,
        id:idcount++,
        status:"TODO"
    };
    db.push(body);
    res.json(body);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


