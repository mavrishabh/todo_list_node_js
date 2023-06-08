const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

const Swal = require('sweetalert2');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/', function(req, res){

    Todo.find({}).then(function(todo){ 
            return res.render('home', {
                title: "TODO List",
                todo_list: todo
            });

        }).catch(function(err){
            console.log('Error occurred in fetching Data :(');
        });
});

app.post('/create-list', function(req, res){
    
    
    Todo.create(req.body);
    return res.redirect('back');
  

});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

// for deleting a contact
app.post('/delete-list', function(req, res){
    //getting the id of selected boxes
    let id = req.query.id;
    console.log(id);

    //gives the length of the selected checkboxes
    let checkboxes=id.split(',');

    //iterating over each selected boxes
    for(let i=0;i<checkboxes.length;i++)
    {
        // find the item in the database using id and delte it
        console.log(checkboxes[i]);
        Todo.findByIdAndDelete(checkboxes[i]).catch(err => {
            if(err)
            {
                console.log("error in deleteing the item");
                return;
            }
            
        });
    }
    return res.redirect('back');
});
