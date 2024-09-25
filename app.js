const express=require("express");
const mongoose = require('mongoose');
const path=require("path");

const app=express();
const Campground = require('./models/campground');
const portNumber=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


mongoose.connect("mongodb://localhost:27017/yelp-camp",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
      console.log('MongoDBコネクションOK！！');
  })
  .catch(err => {
      console.log('MongoDBコネクションエラー！！！');
      console.log(err);
  });







app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/makecampground",async(req,res)=>{
    const camp= new Campground ({
        title:`私の庭`,
        description:`気軽に`
    })
    await camp.save();
    res.send("キャンプ")
})


app.listen(portNumber,()=>{
    console.log(`${portNumber}でサーバー起動`)
})