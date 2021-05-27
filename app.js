const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const dbCongfig = require(__dirname + "/dbConfig.js");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

const assignments = [];

app.get("/", (request, response) => {

    let day = date.getDate();

    // console.log(dbCongfig.Todolist);
    dbCongfig.Todolist.find({}, (err, items) => {
        response.render("list", {
            listTitle: day,
            listItems: items
        });
    });
});

app.get("/assignment", (request, response) => {

    assignments.push()

    response.render("list", {
        listTitle: 'Assignment List',
        listItems: assignments
    });
});

app.post("/", (request, response) => {
    if (request.body.reset === "reset-list") {
        console.log("delete items");
        // response.redirect("/");
    }
    let newItem = request.body.newItem;
    if (request.body.list === "Assignment List") {
        assignments.push(newItem);
        response.redirect("/assignment");
    } else {
        dbCongfig.insertTask(newItem);
    }
    response.redirect("/");
});

app.post("/delete", (request, response) => {
    const checkedId = request.body.checkbox;

    dbCongfig.deleteTask(checkedId);
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});