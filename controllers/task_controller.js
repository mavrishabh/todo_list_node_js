const Todo = require('../models/todo');

// Setting up the home page
module.exports.home = function(req, res){

    Todo.find({}).then(function(todo){ 
        // rendering the page and providing title to it
            return res.render('home', {
                title: "TODO List",
                todo_list: todo
            });

        }).catch(function(err){
            console.log('Error occurred in fetching Data :(');
        });
};

// function for new Data
function Dates(dueDate){
    let months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'] // static value for implementing monthe value


    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate =dueDate[2]+' '+monapp+', '+dueDate[0] // displaying date in dd mm, yyyy format. Eg - "21 June, 2023"
    return newdate;
}

// for creating a task
module.exports.create = async function(req, res){
    
    dueDate =req.body.dateValue.split('-'); // splitting date and taking month value
    let newdate=''; //declaring empty array
    newdate= Dates(dueDate);     
    Todo.create({ // crating new todo and storing into DB
        description:req.body.description,
        category:req.body.category,
        date: newdate
    });
    return res.redirect('back');
  

};

// for deleting a task
module.exports.delete = function(req, res){
    //getting the id of selected boxes
    let id = req.query.id;
    // console.log(id); //checking the ID

    //gives the length of the selected checkboxes
    let checkboxes=id.split(',');

    //iterating over each selected boxes
    for(let i=0;i<checkboxes.length;i++)
    {
        // find the item in the database using id and delte it
        // console.log(checkboxes[i]); //checking whether it is correctly splitted or not
        Todo.findByIdAndDelete(checkboxes[i]).catch(err => {
            if(err)
            {
                console.log("error in deleteing the item");
                return;
            }
            
        });
    }
    return res.redirect('back');
};