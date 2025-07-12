const mongoose = require('mongoose');
const cities = require('./cities.js');
const { descriptors , places} = require('./seedHelpers.js');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/ylm-camp',
    { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDBコネクションOK!');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー!!');
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const randomIndex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomIndex].prefecture}${cities[randomIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});