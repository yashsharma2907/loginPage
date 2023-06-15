const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const port =  process.env.PORT||5001;
const encrypt= require('mongoose-encryption'); 
const alert = require('alert');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
const path = require('path');
app.use(express.static('client/my-app/build'));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client/my-app', 'build', 'index.html'));
});
//mongoose connect link

mongoose.connect("mongodb+srv://yashsharma_29:Ya$290701@cluster0.zmoftll.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});


// Schema making 
const userSchema= new mongoose.Schema({
    email:String,
    password:String,
    fname:String,
    lname:String
});
//password hashing
const secret="Thisismylongsecretssssss.";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
// for making object or model
const User = new mongoose.model("User",userSchema);

app.get("/signup",function(req,res){
res.send("signup");
});
app.post("/register",function(req,res){
    const newUser=new User({
        email:req.body.username,
        password:req.body.password,
        fname:req.body.firstname,
        lname:req.body.lastname
    })
    console.log(req.body.username);
    User.findOne({email:req.body.username},function(err,founduser){
                newUser.save(function(err){
                        console.log("data saved");
                    })
                });  
});
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
app.post("/login",function(req,res){
    const checkuser =req.body.username1;
    const checkpass= req.body.password1;
    console.log(checkpass);
    User.findOne({email:checkuser},function(err,founduser){
        if(err)
        console.log(err);
        else{
            if(founduser){
                console.log("abc");
                if(founduser.password===checkpass)
                res.redirect("http://www.google.com");
                
            }
        }
    })
})

app.listen(port,function(){
    console.log("port is listening");
})