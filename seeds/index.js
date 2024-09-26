const mongoose=require("mongoose");
const Campground=require("../models/campground");
const cities=require("./cities");
mongoose.connect("mongodb://localhost:27017/yelp-camp",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDBコネクションOK！！');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー！！！');
        console.log(err);
    });
  
  const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const randomCityIndex=Math.floor(Math.random()*cities.length);
        const randomCity=cities[randomCityIndex];
        const camp=new Campground({
            location:`${randomCity.prefecture}${randomCity.city}`
        });
        await camp.save();
    }

  }
  seedDB();