$(function(){

  $("#nav ul a").each(function(index, elem){
    if ($(elem).attr("href") == window.location.pathname)
    {

      //$(elem).addClass("active")

    }

  })

});