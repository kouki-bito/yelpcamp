const express=require("express");
const app=express();
const portNumber=3000;
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();


app.get("/",(req,res)=>{
    res.render("home")
})


app.listen(portNumber,()=>{
    console.log(`${portNumber}でサーバー起動`)
})