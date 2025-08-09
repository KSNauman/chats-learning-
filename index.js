const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");


app.set("views", path.join(__dirname, "views"));
// app.set("views" , "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

main().then(() => {
    console.log("connection succesful")
})
    .catch(err => console.log(err));

// Async wrappper
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
// Index route
app.get("/chats", asyncWrap(
    async (req, res, next) => {
        let chats = await Chat.find();
        // console.log(chats);
        // res.send("Working")
        res.render("index.ejs", { chats });
    }));

// New post route
app.get("/chats/new", asyncWrap(
    (req, res) => {
        // res.send("NEW POST route working")
        // throw new ExpressError(404,"Page not found");

        res.render("new.ejs");
    }));

app.post("/chats",asyncWrap(
    async (req, res, next) => {
        let { from, msg, to } = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date()
        });
        // console.log(newChat);
        await newChat.save()
            .then(res => console.log("Chat saved"))
            .catch(err => next(err));
        res.redirect("/chats");
}))
     
// new route for show route 
app.get("/chats/:id", asyncWrap(
    async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        // throw new ExpressError(404, "Chat not found");// works fine with express 5
        next(new ExpressError(500, "Chat not found"));
    }
    res.render("show.ejs", { chat });
}))
    


// Edit route
app.get("/chats/:id/edit", asyncWrap(
    async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render("edit.ejs", { chat });
}))
    

// update route
app.put("/chats/:id", asyncWrap(
    async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedMsg = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
    console.log(updatedMsg);
    res.redirect("/chats");
}))
    

// Delete route
app.delete("/chats/:id", asyncWrap(
    async (req, res) => {
    let { id } = req.params;
    let DeletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
}))
    

// Main route
app.get("/", (req, res) => {
    res.send("MAIN WORKING");
})
// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("App is listening on port 8080");
})