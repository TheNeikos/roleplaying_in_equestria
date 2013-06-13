$(function(){

  function pathChanged() 
  {
    $("#nav ul a").removeClass("active").each(function(index, elem){
      if ($(elem).attr("href") == window.location.pathname)
      {
        $(elem).addClass("active")
      }
    })
  }
  pathChanged()

  function loadFromPath(path, force)
  {
    if(location.pathname == path && !force){return;}
    $.get(path, function(content){

      $("#content").replaceWith($(content).find("#content"))

      document.title = $(content).filter("title").text()

      if(!force){
        history.pushState({loadable: true},null,path)
      }

      pathChanged()
      
    }).error(function(){

      $("#error-modal").show()

    })

  }

  $("body").on("click", "a", function(e){

    var elem = this;

    if( (elem.host != "lvh.me") ^ (elem.host != "roleplayinginequestria.com") && elem.pathname[0] != "#" ){ return; }
    $("#error-modal").hide()
    e.preventDefault()
    // Now let's do magic and replace the #content!

    loadFromPath(elem.pathname)

  })

  $("a.close").click(function(e){
    e.preventDefault()

    $(e.target).parents(".modal").hide()


  })

  $(window).on("popstate", function(e){
    if(!e.originalEvent.state || !e.originalEvent.state.loadable){ return; }
    loadFromPath(location.pathname, true)

  })

});