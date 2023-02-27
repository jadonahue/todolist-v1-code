const express = require("express");
const app = express();

// 3000 is what we used for local. For Heroku we need to use process.env.PORT. Which is a dynamic port.
const port = process.env.PORT;
const bodyParser = require("body-parser");

// Our local module and function we created in date.js. Module gets bound to date here.
const date = require(__dirname + "/date.js"); 

// To Do Items
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// This sets ejs as the view engine.
app.set("view engine", "ejs");

// This sets up body-parser for use.
app.use(bodyParser.urlencoded({ extended: true }));

// This serves static files in public folder.
app.use(express.static("public"));

app.get("/", function (req, res) {

    // This uses the module and function we created in date.js which is bout to date and sets it in variable day.
    const day = date.getDate();

    // This creates response by rendering file called "list.ejs" in "views" folder. 
    // Into the list file we pass a single variable named "listTitle" and the value is the of our variable "day".
    // Could use the same variable like "{day: day}". I decided for this to use to variables to be clear. 
    res.render("list", { listTitle: day, newListItems: items });
});

// Uses body-parser to grab the body input item named newItem in list.ejs
app.post("/", function (req, res) {

    const item = req.body.newItem;

    // This checks the list value using ejs <%= listTitle %>. 
    // If its Work it pushes item to workItem array & redirects back to /work page.
    // Else it pushes item to items array and redirect back to / page.
    if (req.body.list === "Work") {
        // Adds item to items array
        workItems.push(item);

        // Redirects back to /work
        res.redirect("/work");

    } else {

        // Adds item to items array
        items.push(item);
    
        // Redirects back to /
        res.redirect("/");
    }

});

// Uses ejs template to create a new page /work for work list items.
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems} ); 
 });

// Uses ejs template but not the layout with the header or footer.
app.get("/about", function (req,res) {
    res.render("about");
});

app.listen(port || 3000, function () {
    console.log("Server started on port 3000");
});