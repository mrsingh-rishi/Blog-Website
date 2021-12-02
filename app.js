//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "In this world, wherever there is light - there are also shadows. As long as the concept of winners exists, there must also be losers. The selfish desire of wanting to maintain peace causes wars, and hatred is born to protect love.";
const aboutContent = "A Progammer,";
const contactContent = "For Contact use,";

const app = express();  

mongoose.connect("mongodb+srv://admin-rishi:rs%4012%402002@cluster0.8segm.mongodb.net/blogDB?retryWrites=true&w=majority");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){

  Post.find({}, function(err, posts){

    res.render("home", {
 
      startingContent: homeStartingContent,
 
      posts: posts
 
      });
 
  });

  // res.render("home", {
  //   startingContent: homeStartingContent,
  //   posts: posts
  //   });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

  const post = new Post ({

    title: req.body.postTitle,
 
    content: req.body.postBody
 
  });


  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;


  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });


  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

let port = process.env.PORT;
if(port== null || port == ""){
  port == 8000;
}

app.listen(port || 3000, function() {
  console.log("Server started on port 3000");
});
