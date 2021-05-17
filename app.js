const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

let items = [];

app.get("/", (request, response) => {
   
    let day = date.getDate();

    response.render("list", {
        day: day,
        newListItems: items
    });
});


app.post("/", (request, response) => {

    if (request.body.reset === "reset-list") {
        items = [];
        response.redirect("/");
    } else {
        var newItem = request.body.newItem;
        if (newItem !== "") {
            items.push(newItem);
        }
        response.redirect("/");
    }
});



app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});