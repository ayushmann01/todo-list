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

app.get("/", (request, response) => {

    let day = date.getDate();

    // console.log(dbCongfig.TodoList);
    dbCongfig.TaskList.find({}, (err, items) => {
        response.render("list", {
            listTitle: "Today",
            listItems: items
        });
    });
});

app.get("/custom/:customList", (request, response) => {

    // console.log(request.params.customList);
    const customListName = request.params.customList;
    dbCongfig.CustomList.findOne({
        title: customListName
    }, (err, list) => {
        if (!err) {
            if (!list) {
                dbCongfig.newCustomList(customListName);
            } else {
                response.render('list', {
                    listTitle: customListName,
                    listItems: list.tasks
                });
            }
        }
    });
});

app.post("/", (request, response) => {
    if (request.body.reset === "reset-list") {
        // console.log("delete items");
        response.redirect("/");
    }
    let newItem = request.body.newItem;
    let list = request.body.list.toLowerCase();
    if (list === "today") {
        dbCongfig.insertTask(newItem);
        response.redirect("/");
    }else {
        dbCongfig.insertCustomList(newItem, list);
        response.redirect("/custom/"+ list);
    }
});

app.post("/delete", (request, response) => {
    const checkedId = request.body.checkbox;
    const listName = request.body.listName.toLowerCase();
     console.log(listName);
    if(listName === "today")
    { 
        dbCongfig.deleteTask(checkedId);
        response.redirect("/");
    } else {
        dbCongfig.deleteCustomList(checkedId, listName);
        response.redirect("/custom/"+ listName);
    }
     
});

app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});