const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const ContactSchema={
    name:String,
    mail:String,
    message:String
};
const Contact= mongoose.model("Contact",ContactSchema);
mongoose.connect("mongodb://localhost:27017/portfolioDB")

app.get('/',function(req,res){
    res.render('home');
  });

app.get('/contact',function(req,res){
    res.render('contact');
});

// app.post('/contact',function(req,res){
//     const name=req.body.name;
//     const mail=req.body.mail;
//     const msg=req.body.msg;

//     console.log(msg);
//     res.redirect("/");
// });


app.post("/contact",function(req,res){
    const name=req.body.name;
    const mail=req.body.mail;
    const msg=req.body.msg;
    const person= new Contact({
      name:name,
      mail:mail,
      msg:msg  
    });
    person.save();
    res.redirect("/");
  
  });
  

app.listen(process.env.PORT||5000,function()
{
    console.log("listening");
})