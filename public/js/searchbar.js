

$("#search").on('keyup',function(e) {search(e); });
    const search = function(e) {

    e.preventDefault();
    var searchResults = [];
    $("#search-results").empty();
    if ($("#search").val().trim().length < 3) {
       
        $("#search-results").css({ display: "none" });
    }

    if ($("#search").val().trim().length >= 3) {

    
    var inputSearch = $('#search').val();
    var url = "http://api.tvmaze.com/shows?q="+inputSearch;
  
   
   
        $.ajax({
            method: "GET",
            url: url
        })
        .done(function(response) {
      
            for (var i=0;(i<6) && i<response.length;i++){
                showObj = {};
                showObj.id = response[i].id;
                showObj.name = response[i].name;
                showObj.genre = JSON.stringify(response[i].genres);
                showObj.image = response[i].image.medium;
                searchResults.push(showObj);
            }
           console.log(searchResults);
            searchResults.forEach(function(currentMatch,index) {   
            
                $("#search-results").append(
                    "<div class='d-flex w-100'>"+
                    "<div class='show-search-image '>"+
                    "<img class='very-small-icon' src='"+currentMatch.image+"' alt='Show small Icon' /></div>"+
                    "<div class='show-search-list'>"+
                    "<a class='d-block text-secondary' href='../shows/"+currentMatch.id+"'>"
                    +currentMatch.name+"</a></div></div>");
                   
                   
            })
        
        $("#search-results").css({ display: "block" });
    })
    }
}

$('input[type=search]').on('search', function () {
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
});

$(window).click(function(e) {
    if (!e.target.id !== "#search-results");  {
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
    }
});

$(window).on('wheel', function(e){
    var container = $("#search-results");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
    
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
    }
  });



