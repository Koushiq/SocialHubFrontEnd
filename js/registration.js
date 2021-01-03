$(document).ready(function(){

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:"http://localhost:62009/api/registration",
            method: 'POST',
            data:{
               "Username":$("#username").val(),
               "Password":$("#password").val(),
               "Firstname":$("#firstname").val(),
               "Lastname":$("#lastname").val(),
               "Propic":'',
            
            },
            success: function(res) {
               if(res!=undefined)
               {
                    alert("user created");
               }
               else
               {
                    alert("not created");
               }
            }
        }); 
    });
});