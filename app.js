const express=require("express");
const mongoose = require('mongoose');
const path=require("path");
const methodOverride = require('method-override')
const app=express();
const Campground = require('./models/campground');
const campground = require("./models/campground");
const portNumber=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
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
app.get(`/campgrounds`,async(req,res)=>{
    const campgrounds=await Campground.find({});
    res.render(`campgrounds/index`,{campgrounds});
})
app.get(`/campgrounds/new`,async(req,res)=>{
    res.render("campgrounds/new")
})

app.get(`/campgrounds/:id`,async(req,res)=>{
    const campground=await Campground.findById(req.params.id)
    res.render("campgrounds/show",{campground});
})
app.get(`/campgrounds/:id/edit`,async(req,res)=>{
    const campground=await Campground.findById(req.params.id)
    res.render("campgrounds/edit",{campground});
})
app.post(`/campgrounds`,async(req,res)=>{
    
    const campground=new Campground(
        req.body.campgrounds
    );
  
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`)
    
})
app.put(`/campgrounds/:id`,async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{
        ...req.body.campgrounds
    })
    res.redirect(`/campgrounds/${campground._id}`);
})
app.delete(`/campgrounds/:id`,async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect("/campgrounds")
})
app.listen(portNumber,()=>{
    console.log(`${portNumber}でサーバー起動`)
})