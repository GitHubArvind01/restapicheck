const express = require("express");
const app = express();

const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended:true}));

//these both line clear for any render ejs file only find in /views folder
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//its access the static file in ejs 
app.use(express.static(path.join(__dirname,"public")));

//Demo DataBase of user data
let posts = [
    {
        id: "1a",
        username : "ravi",
        content: "i am student",
    },
    {
        id: "2b",
        username : "sonu",
        content: "i am engineer",
    },
    {
        id: "3c",
        username : "yash",
        content: "i am childern",
    }
];

//main landing home page 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//new route with create a new post using "/posts/new" reqest
app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("Profile.ejs" , {post});
});

//redirect to main home page, when we submit a new post 
app.post("/posts",(req,res)=>{
    let{username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
});


//its listen the sever start or not 
app.listen(port,()=>{
    console.log("port are listening!");
});