const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

let items = ['first-item',];

app.get("/", (request, response) => {
    const today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let day = today.toLocaleDateString('hi-IN', options);

    response.render("list", {
        day: day,
        newListItems: items
    });
});


app.post("/", (request, response) => {
    var newItem = request.body.newItem;
    
     if(newItem !== ""){
        items.push(newItem);
     }
     
    response.redirect("/");
});



app.listen(process.env.PORT || 3000, () => {
    console.log("todolist app started at port:3000");
});