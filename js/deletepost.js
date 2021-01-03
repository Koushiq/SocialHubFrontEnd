const cookieVal=getCookie();
if(document.cookie=="")
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
        var id = getUrlParameter('id');
        console.log('i am here');
        console.log("http://localhost:62009/api/posts/"+id);

        $("#delete").click(function(){
            $.ajax({
                url:"http://localhost:62009/api/posts/"+id,
                method:"DELETE",
                success:function(res){
                    console.log('here');
                    window.location.href= "http://localhost/atp2finaltermassignment/views/home.html";
                }
            });
           
        });
        //window.location.href= "http://localhost/atp2finaltermassignment/views/home.html";


  });