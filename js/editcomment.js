let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;

  const cookieVal=getCookie();
  if(cookieVal=="")
  {
      window.location.href = "http://localhost/atp2finaltermassignment/views/index.html";
  }
  
  $(document).ready(function(){

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
        
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        };
        var postId = getUrlParameter('postId');
        var commentId = getUrlParameter('commentId');

        $.ajax({
            url:"http://localhost:62009/api/posts/"+postId+"/comments/"+commentId,
            method:"GET",
            success:function(res){
                console.log('here');
                console.log(res);
                $("#comment").val(res.CommentContent);
                $("#createdat").html(res.CreatedAt);
            }
        });


        $("form").submit(function(e){
            e.preventDefault();
            console.log("http://localhost:62009/api/posts/"+postId+"/comments/"+commentId);
            if($("#comment").val()!="")
            {
                console.log(postId);
                console.log(commentId);
                
                $.ajax({
                    url:"http://localhost:62009/api/posts/"+postId+"/comments/"+commentId,
                    method:"PUT",
                    data:{
                        "CommentContent":$("#comment").val(),
                        "CreatedAt":date,
                        "CreatedBy":cookieVal,
                        "PostID":postId,
                    },
                    success:function(res){
                        console.log('here');
                        console.log(res);
                        $("#comment").val(res.CommentContent);
                        alert("comment updated");
                    }
                });
            }
            else
            {
                alert('can not be empty');
            }
        });

  });