const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const dbCongfig = require(__dirname+"/dbConfig.js");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

 let items = [];
 let assignments = ['first-assignment'];

 
app.get("/", (request, response) => {
   
    let day = date.getDate();

    // console.log(dbCongfig.Todolist);

    response.render("list", {
        listTitle: day,
        listModel: dbCongfig.Todolist
    });
});


app.get("/assignment", (request, response) => {

    assignments.push()

    response.render("list", {
        listTitle: 'Assignment List',
        newListItems: assignments
    });
});

app.post("/", (request, response) => {

  if (request.body.reset === "reset-list") {
        items = [];
        response.redirect("/");
    } else {
        let newItem = request.body.newItem;
        if (newItem !== "") {
          if (request.body.list === "Assignment List") {
            assignments.push(newItem);
            response.redirect("/assignment");
          } else {
            items.push(newItem);
            response.redirect("/");
            }
        }

    }
});



app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});