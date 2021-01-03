let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;


$(document).ready(function(){
    let cookieVal=getCookie();
    console.log(date);
    if(cookieVal!="")
    {
        console.log(cookieVal);
        $("form").submit(function(e){
            e.preventDefault();
            let value = $("#postID").val();
            if(value!="")
            {
                console.log(value);
                 $.ajax({
                    url:"http://localhost:62009/api/posts",
                    method: 'POST',
                    data:{
                        "PostContent":$("#postID").val(),
                        "PostPic":'',
                        "CreatedAt":date,
                        "CreatedBy":cookieVal,
                    },
                    success: function(res) {
                       if(res!=undefined)
                       {
                            alert("post created");
                       }
                       else
                       {
                            alert("not created");
                       }
                    }
                }); 
            }
            else
            {
                alert("can not submit empty post ");
            }
        });
    }
    else
    {
        window.location.href = "http://localhost/atp2finaltermassignment/views/index.html";
    }
});