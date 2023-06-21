// Establishing connection with the Database

const mongoose = require('mongoose');
// const env = require('./environment');
mongoose.connect('mongodb+srv://mavrishabh:RSmaverik3204%40@cluster0.ys8r5gy.mongodb.net/',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;