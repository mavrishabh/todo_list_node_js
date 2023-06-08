function checkedOrNot(){ 
    let cb = document.querySelectorAll('.deletecheck'); // getting all the check-box class 
    let desc = document.querySelectorAll('.desc'); // gettong all the class where descripting of TODO is defined
    let ddsp = document.querySelectorAll('.dueDate'); // getting all the class for dueDate
    for(let i=0;i<desc.length;i++){
        let dueDate = ddsp[i].innerHTML;
        // checking if checkbox is checked  if checked a line will pass through the text(-) else if it is unchecked no line will pass through date and description
            if(cb[i].checked == true){ 
            document.getElementById(cb[i].getAttribute('uid')).style.textDecoration = 'line-through'
            document.getElementById(cb[i].getAttribute('uid')+dueDate).style.textDecoration  = 'line-through'
            }
            else if(cb[i].checked == false){
            document.getElementById(cb[i].getAttribute('uid')).style.textDecoration = 'none'
            document.getElementById(cb[i].getAttribute('uid')+dueDate).style.textDecoration  = 'none'
        }
       
    } 
   
}

document.getElementById('deleteButton').addEventListener('click',function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if(result.isConfirmed){
            let checkedvalue = document.querySelectorAll('.deletecheck:checked') // getting only checked vale
            let arrcheck = []  // creating the list of checked array
            for(let i of checkedvalue){
                let gg=''
                gg= i.getAttribute('uid')    // getting unique id from and pushing into array
                console.log(gg)
                arrcheck.push(gg);
            }
            if(arrcheck.length===0){ // checking if array is null the 
                console.log('no item is checked');
                Swal.fire({
                    icon: 'warning',
                    title: 'No Item is Selected',
                    text: 'Select Something to Remove!',
                }); // using show alert to show if there is no items in the array
                return;
            }
            //here we are making delete request with the help of Ajax request 
            $.ajax({
                type: 'post',
                url: '/delete-list/?id='+arrcheck,
                success: function(){ // on ajax sunnces i.e when data is delete
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ) // using sweet alert to show the data is delete
                    .then(redir => {
                        window.location = '/';
                    })
                
                },
                error: function(err){ 
                    console.log(err);
                }

            });
        }
    })
    
});