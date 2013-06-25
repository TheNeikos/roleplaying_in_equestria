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
      // http://www.pansapien.com/ember/2013/01/using-google-analytics-with-ember-js/ Thanks!
      page = window.location.hash.length > 0 ?
             window.location.hash.substring(1) :
             window.location.pathname;

      // You need your Google Analytics code already loaded for _ga to be initialized
      ga('send', 'pageview' ,page);
      pathChanged()
      
    }).error(function(){

      $("#error-modal").show()

    })

  }

  $("body").on("click", "a", function(e){

    var elem = this;
    if( elem.pathname[0] == "#" ){ return; }
    
    if( elem.host != window.location.hostname ){return;}
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

  function google(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)
    }, i[r].l=1*new Date();
    a=s.createElement(o),  m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m)
  }
  google(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-41721936-1', 'roleplayinginequestria.com');
  ga('send', 'pageview');


});