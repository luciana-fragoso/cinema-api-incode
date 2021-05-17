
$( document ).ready(function() {

    var inputSearch;
    
    $("#search").on('keyup change',function(e) {search(e); });
    
    const search = function(e) {
        e.preventDefault();
        var searchResults = [];
     
        $("#search-results").empty();
       
        if ($("#search").val().length >= 3) {
            if (e.keyCode === 13){
                inputSearch = $('#search').val();
                search_function(e);
        } else {
        inputSearch = $('#search').val();
        

        var url = "http://api.tvmaze.com/search/shows?q="+inputSearch;

        $.ajax({
            method: "GET",
            url: url
            })
        .done(function(response) {
            for (var i=0;(i<6) && i<response.length;i++){
                if ((response[i].show.image) !== null) {
                    showObj = {};
                    showObj.id = response[i].show.id;
                    showObj.name = response[i].show.name;
                    showObj.genre = JSON.stringify(response[i].show.genres);
                    showObj.image = response[i].show.image.medium;
                    searchResults.push(showObj);
                }
            }   

         
            searchResults.forEach(function(currentMatch,index) {   
                $("#search-results").append(
                    "<div class='d-flex w-100 each-show'>"+
                    "<div class='show-search-image'>"+
                    "<a href='../shows/"+currentMatch.id+"'><img class='very-small-icon' src='"+currentMatch.image+"' alt='"+currentMatch.name+" icon' /></a></div>"+
                    "<div class='show-search-list'>"+
                    "<a class='d-block text-secondary' href='../shows/"+currentMatch.id+"'>"
                    +currentMatch.name+"</a></div></div>");     
                })
                $("#search-results").css({ display: "block" });
            });
        }
    }
}

//* events to close the search result */
$('input[type=search]').on('search', function () {
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
});

$(window).click(function(e) {
    if (!e.target.id !== "#search-results")  {
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

  


const search_function = function(e) {
       
    var searchResults = [];
    e.preventDefault();
    $("#search").val("");
    $("#search-results").css({ display: "none" });









 
    var url = "http://api.tvmaze.com/search/shows?q="+inputSearch;
    
    $.ajax({
            url: '../ratings',
            method: 'GET',
            datatype: 'json'  
        }).done(function(average) {
            
            var ids = [];
            var avgs = [];
            
            average[0].find(function(show){
                ids.push(show.show_id);
                avgs.push(show.average);
            });
          
            $.ajax({
                method: "GET",
                url: url
                })
            .done(function(response) {
               
                for (var i=0;(i<20) && i<response.length;i++){
                
                    if ((response[i].show.image) !== null) {
                        showObj = {};
                        showObj.id = response[i].show.id;
                        showObj.name = response[i].show.name;
                        showObj.genre = response[i].show.genres;
                        showObj.image = response[i].show.image.medium;
                        showObj.summary = response[i].show.summary;
                        showObj.year = response[i].show.premiered;

                        if (ids.includes(response[i].show.id)) {
                            
                            showObj.average = parseFloat(avgs[ids.indexOf(response[i].show.id)]).toFixed(1);
                        }
                        else
                            showObj.average = null
                        


                        searchResults.push(showObj);
                    }
                
                }
            
        
        $("#main").empty();
        $("#main").append("<br>");
            
     
        searchResults.forEach(function(show,index) {   
                let url = "../shows/"+show.id;
                let html = "<div class='card-horizontal'><div class='search-icon-card'><a href='"+url+"'><img  src='"+show.image+"'alt='"+show.name+" icon'></a></div><div class='card-body p-0'><div class='card-footer'> <div class='d-block w-100 star-position'><i class='fa fa-star fa-lg mb-0 star-icon' aria-hidden='true' >";
                if (show.average !== null) {
                    html += "<span class='text-dark ml-1'>"+show.average+"</span>";
                } 
                html +="</i></div></div><a href='"+url+"'><h4 class='card-title small-title font-weight-bold text-dark ml-3 mr-3 mt-2'>"+show.name+"</h4></a>";
                if (show.genre.length > 0){
                    html += "<h6 class='ml-3 font-weight-bold'>Genre: <span class='show-year'> "+show.genre.join(" - ")+"</span>";
                }
                
            
               html+="<h6 class='mt-2 mb-2 ml-3 font-weight-bold medium-font'>Release Year: <span class='show-year'>"+show.year.split("-")[0]+"</span> </h6></div>";
             
               $("#main").append(html);
              
         
            });

 
               


            

           
        });
            

});

}

$("#search-button").on("click",function(e) {
    
    inputSearch = $('#search').val().trim();
    search_function(e)});
});




               