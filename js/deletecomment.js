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


        $("#delete").click(function(){
            $.ajax({
                url:"http://localhost:62009/api/posts/"+postId+"/comments/"+commentId,
                method:"DELETE",
                success:function(res){
                    console.log('here');
                    window.location.href= "http://localhost/atp2finaltermassignment/views/home.html";
                }
            });
           
        });


  });