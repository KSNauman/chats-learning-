const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("connection succesful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let chat1 = [
    {from:"nauman",to:"ahmed",msg:"Hi ,hello",created_at: new Date()},
    {from:"Ahmed",to:"KS",msg:"Hi ,hello abc",created_at: new Date()},
    {from:"Zeba",to:"Swagath",msg:"Hi ,hello def",created_at: new Date()},
    {from:"anjum",to:"ganesh",msg:"Hi ,hello ghi",created_at: new Date()},
    {from:"Akther",to:"karthikeya",msg:"Hi ,hello jkl",created_at: new Date()},
    {from:"mubeen",to:"chintu",msg:"Hi ,hello mno",created_at: new Date()},
    {from:"madiha",to:"joe",msg:"Hi ,hello pqr",created_at: new Date()},
    {from:"varshita",to:"kriya",msg:"Hi ,hello stu",created_at: new Date()}
]
Chat.insertMany(chat1);