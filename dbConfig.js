const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection fail')  );
db.once('open', () => {
    console.log("Successfully connected");
});

const listSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active"
    }
});


const Todolist = new mongoose.model('todolist', listSchema);
exports.Todolist = Todolist;


exports.insertTask = (task) => {
   const item = new Todolist({
       task: task
   });
   
   item.save((err) => {
     if(err) console.log("insertion failed");
     else{
         mongoose.connection.close();
        console.log("successfully added");
     }      
   });
};

exports.deleteTask = (task) => {
    Todolist.deleteOne({task: task}, (err) => {
        if(err) console.log(err);
        else{
            console.log('successfully deleted');
            exports.showList();
        }
    });
};

exports.showList = () => {
    Todolist.find( (err, items) => {
        if(err) console.error(err);
        else {
            mongoose.connection.close();
            console.log(items);
        }
    });
};


// exports.deleteTask('test');

// exports.showList();

//exports.insertTask('test');
