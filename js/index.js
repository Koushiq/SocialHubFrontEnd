$(document).ready(function(){
   $("form").submit(function(e){
        e.preventDefault();
        $("#usernameErr").html('');
        $("#passwordErr").html('');
        let User = {
            username:$("#username").val(),
            password:$("#password").val()
        }
        let res=validate(User);
        //console.log( Object.keys(res).length);
        if(Object.keys(res).length==0)
        {
            $.ajax({
                url:"http://localhost:62009/api/users",
                method: 'POST',
                data:{
                    "Username":User.username,
                    "Password":User.password
                },
                success: function(res) {
                   if(res!=undefined)
                   {
                       let cookieVal = {
                           username:User.username
                       }
                        document.cookie = JSON.stringify(cookieVal);
                        window.location.href = "http://localhost/atp2finaltermassignment/views/home.html";
                   }
                   else
                   {
                        $("#usernameErr").html("<script>alert('invalid username or password');</script>");
                   }
                }
            });
        }
        else
        {
            $("#usernameErr").html(res.usernameErr);
            $("#passwordErr").html(res.passwordErr);
            console.log("error invalid request");
        }
        /* $.ajax({
            url:"http://localhost:62009/api/users",
            method: 'POST',
            data:{
                "Username":User.username,
                "Password":User.password
            },
            success: function(data) {
                console.log("success ", data);
            },
            failure: function(data) {
                console.log("failed ",data);
            },
        }); */
    });
   

});

function validate(User)
{
    let errorLog =  {};
    for (let key in User) {
        
        if(User[key]=="")
        {
            errorLog[key+"Err"]=key+" can not be empty";
        }

      }
      return errorLog;
}