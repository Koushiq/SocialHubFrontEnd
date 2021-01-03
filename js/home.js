let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;

var cookieVal=getCookie();
console.log(cookieVal);
if(cookieVal=="")
{
    console.log("here");
    window.location.href = "http://localhost/atp2finaltermassignment/views/index.html";
}

$(document).ready(function(){

        $("#mymsg").html("hello "+cookieVal);
        $.ajax({
            url:"http://localhost:62009/api/posts",
            method: 'GET',
            success: function(data){
               let posts= "";
               console.log(data);
               for(i=0;i<data.length;i++)
               {
                    posts+=
                    `<tr>
                        <td>
                            <small>Posted At : `+data[i].CreatedAt+`</small>
                            <small>Posted By: `+data[i].CreatedBy+`</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="postID" readonly name="post" rows="4" cols="50">`+data[i].PostContent+`</textarea>
                        </td>
                    </tr>
                    `;
                   if(data[i].CreatedBy==cookieVal)
                   {
                        console.log('here');
                        posts+=`<tr>
                                    <td>
                                        <a href="http://localhost/atp2finaltermassignment/views/editpost.html?id=`+data[i].PostID+`">Edit Post</a> |
                                        <a href="http://localhost/atp2finaltermassignment/views/deletepost.html?id=`+data[i].PostID+`">Delete Post</a>
                                    </td>
                                </tr>
                                `;
                   }

                   for(j=0;j<data[i].Comments.length;j++)
                   {
                       posts+=`<tr>
                                  <td><span style="color:blue;">`+data[i].Comments[j].CreatedBy+":-- </span>"+data[i].Comments[j].CommentContent+`</td> `;
                        if(data[i].Comments[j].CreatedBy==cookieVal)
                        {
                            posts+=`<td><a href="http://localhost/atp2finaltermassignment/views/editcomment.html?commentId=`+data[i].Comments[j].CommentID+`&postId=`+data[i].PostID+`">Edit Comment </a> | <a href="http://localhost/atp2finaltermassignment/views/deletecomment.html?commentId=`+data[i].Comments[j].CommentID+`&postId=`+data[i].PostID+`"">Delete Comment </a></tr>`;
                        }
                        
                   }
                   posts+=`<tr>
                                <td>
                                    <input placeholder="Enter a comment" type="text" class="submitComment" id="`+data[i].PostID+`"  value="">
                                </td>
                           </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                        `;
               }
               $("#posts").html(posts);
            }
        });
    
    

    setTimeout(function(){

        $('.submitComment').bind("enterKey",function(e){
            //do stuff here

            if($("#"+this.id).val()!=""){
            console.log("http://localhost:62009/api/posts/"+this.id+"/comments");
            $.ajax({
                url:"http://localhost:62009/api/posts/"+this.id+"/comments",
                method: 'POST',
                data:{
                    "CommentContent":$("#"+this.id).val(),
                    "CreatedAt":date,
                    "CreatedBy":cookieVal,
                    "PostID":this.id
                },
                success: function(res){
                    console.log('comment inserted');
                }
            });
            
                window.location.href = "http://localhost/atp2finaltermassignment/views/home.html";
            }
            else
            {
                alert("can not insert empty comment");
            }
         });
         $('.submitComment').keyup(function(e){
             if(e.keyCode == 13)
             {
                 $(this).trigger("enterKey");
             }
         });
    },2000);

});

