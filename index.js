    const express = require("express");
    const app = express();
    const path = require("path");
    const mongoose = require("mongoose");
    const Chat = require("./models/chat.js");
    const methodOverride = require("method-override");

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

    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    }
    // Index route
    app.get("/chats", async (req, res) => {
        let chats = await Chat.find();
        // console.log(chats);
        // res.send("Working")
        res.render("index.ejs", { chats });
    })

    // New post route
    app.get("/chats/new", (req, res) => {
        // res.send("NEW POST route working")
        res.render("new.ejs");
    })
    app.post("/chats", (req, res) => {
        let { from, msg, to } = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date()
        });
        // console.log(newChat);
        newChat.save()
            .then(res => console.log("Chat saved"))
            .catch(err => console.log(err));
        res.redirect("/chats");
    })

    // Edit route
    app.get("/chats/:id/edit",async(req,res)=>{
        let {id} =req.params;
        // console.log(id);
        let chat = await Chat.findById(id);
        // console.log(chat);
        res.render("edit.ejs",{chat});
    })

    // update route
    app.put("/chats/:id",async(req,res)=>{
        let {id} = req.params;
        let {msg:newMsg} = req.body;
        let updatedMsg = await Chat.findByIdAndUpdate(id , {msg : newMsg} ,{ runValidators:true , new:true});
        console.log(updatedMsg);
        res.redirect("/chats");
    })

    // Delete route
    app.delete("/chats/:id",async(req,res)=>{
        let {id} = req.params;
        let DeletedChat =await Chat.findByIdAndDelete(id);
        res.redirect("/chats")
    })

    // Main route
    app.get("/", (req, res) => {
        res.send("MAIN WORKING");
    })

    app.listen(8080, () => {
        console.log("App is listening on port 8080");
    })