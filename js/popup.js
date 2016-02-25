//Use BOOTSTRAP MODAL
var open = false;
$(document).ready(function(){

   $("#show_login").click(function(){
    if(open == true){
      hidepopup();
    }else if(open == false){
      showpopup();
    }
   });
   $("#close_login").click(function(){
    hidepopup();
   });

});

function showpopup()
{
   $("#gLogin").fadeIn();
   $("#gLogin").css({"visibility":"visible","display":"block"});
   open = true;
}

function hidepopup()
{
   $("#gLogin").fadeOut();
   $("#gLogin").css({"visibility":"hidden","display":"none"});
   open = false;
}