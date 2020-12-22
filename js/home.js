let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;

  const cookieVal=JSON.parse(document.cookie);
$(document).ready(function(){
    if(document.cookie!="")
    {
        console.log(cookieVal.username);
        $("#mymsg").html("hello "+cookieVal.username);
        $.ajax({
            url:"http://localhost:62009/api/posts",
            method: 'GET',
            /* data:{
                Username:cookieVal.username
            }, */
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
                   if(data[i].CreatedBy==cookieVal.username)
                   {
                        console.log('here');
                        posts+=`<tr>
                                    <td>
                                        <a href="http://localhost/atp2finaltermassignment/views/editpost.html?id=`+data[i].PostID+`">Edit Post</a> |
                                        <a href="#">Delete Post</a>
                                    </td>
                                </tr>
                                `;
                   }

                   for(j=0;j<data[i].Comments.length;j++)
                   {
                       //<td><input type="text" readonly class="`+data[i].Comments[j].PostID+`" value="`+data[i].Comments[j].CommentContent+`">
                       posts+=`<tr>
                                  <td><span style="color:blue;">`+data[i].Comments[j].CreatedBy+":-- </span>"+data[i].Comments[j].CommentContent+`</td> `;
                        if(data[i].Comments[j].CreatedBy==cookieVal.username)
                        {
                            posts+=`<td><a href="#">Edit Comment </a> | <a href="#">Delete Comment </a></tr>`;
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
    }
    else
    {
        window.location.href = "http://localhost/atp2finaltermassignment/views/index.html";
    }

    setTimeout(function(){

        $('.submitComment').bind("enterKey",function(e){
            //do stuff here
            $.ajax({
                url:"http://localhost:62009/api/comments",
                method: 'POST',
                data:{
                    "CommentContent":$("#"+this.id).val(),
                    "CreatedAt":date,
                    "CreatedBy":cookieVal.username,
                    "PostID":this.id
                },
                success: function(res){
                    console.log('comment inserted');
                }
            });
            window.location.href = "http://localhost/atp2finaltermassignment/views/home.html";
         });
         $('.submitComment').keyup(function(e){
             if(e.keyCode == 13)
             {
                 $(this).trigger("enterKey");
             }
         });
    },2000);

});

