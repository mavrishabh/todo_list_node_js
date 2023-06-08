const express = require('express');
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); 

// included mongoose and todo model
const db = require('./config/mongoose');
const Todo = require('./models/todo');

// included express
const app = express();

app.use(express.urlencoded());
app.use(express.static('assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Using routes
app.use('/', require('./routes'));

// Checking whether the portv is functional or not!
app.listen(port, function(err){
    if(err){
        // console.log('Error: ',err);
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});