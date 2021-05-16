const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

let items = ['first-item', ];
let assignments = ['first-assignment'];
var day;

app.get("/", (request, response) => {
    const today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    day = today.toLocaleDateString('hi-IN', options);

    response.render("list", {
        listTitle: day,
        newListItems: items
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

    //console.log(request.body);

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
});



app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});