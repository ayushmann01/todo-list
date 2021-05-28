const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection fail'));
db.once('open', () => {
    console.log("Successfully connected");
});

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active"
    }
});

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [taskSchema],
        required: true
    },
});


const TaskList = new mongoose.model('todolist', taskSchema);
exports.TaskList = TaskList;
const CustomList = new mongoose.model('customList', listSchema);
exports.CustomList = CustomList;


const defaultItem1 = new TaskList({
    task: "Tick to delete a task"
});
const defaultItem2 = new TaskList({
    task: "Press + to add a new task"
});
const defaultItem3 = new TaskList({
    task: "Press reset to delete list"
});

const defaultItems = [defaultItem1, defaultItem2, defaultItem3];
// TaskList.insertMany(defaultItems);


exports.insertTask = (task) => {
    const item = new TaskList({
        task: task
    });

    item.save((err) => {
        if (err) console.log("insertion failed");
        else {
            // mongoose.connection.close();
            console.log("successfully added");
        }
    });
};

exports.newCustomList = (listName) => {
    const item = new CustomList({
        title: listName,
        tasks: defaultItems
    });

    item.save((err) => {
        if (err) console.log(err);
        else console.log("new custom list created");
    });
};


exports.insertCustomList = (task, listName) => {
    const item = new CustomList({
        title: listName,
        tasks: new TaskList({
            task: task
        }),
    });

    item.save((err) => {
        if (err) console.log(err);
        else console.log("Successfully added");
    });
};

exports.deleteTask = (id) => {
    TaskList.deleteOne({
        _id: id
    }, (err) => {
        if (err) console.log(err);
        else {
            console.log('successfully deleted');
            // exports.showList();
        }
    });
};

exports.showList = () => {
    TaskList.find((err, items) => {
        if (err) console.error(err);
        else {
            mongoose.connection.close();
            console.log(items);
        }
    });
};


// exports.deleteTask('test');

// exports.showList();

// exports.insertTask('test');

// exports.insertCustomList("task1", 'demo');