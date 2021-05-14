$( document ).ready(function() {

    $('#select-id').on('change', function(e) {
        
        var searchResults = [];
        e.preventDefault();
        var genre = this.value;
        //var genre ="Comedy";

        var url = "http://api.tvmaze.com/shows";

        $.ajax({
            method: "GET",
            url: url
            })
        .done(function(response) {
           
          
            response.forEach(function(show,index){
                if ((show.genres).includes(genre)){
                    showObj = {};
                    showObj.id = show.id;
                    showObj.name = show.name;
                    showObj.genre = show.genres;
                    showObj.image = show.image.medium;
                    showObj.year = show.premiered;
                    searchResults.push(showObj);
                }
                   
            });
            
            $("#main").empty();
            $("#main").append("<br>");
            searchResults.forEach(function(show,index) {   
            let url = "../shows/"+show.id;
               
               let html = "<div class='card-horizontal'><div class='search-icon-card'><a href='"+url+"'><img  src='"+show.image+"'alt='"+show.name+" icon'></a></div><div class='card-body p-0'><div class='card-footer'> RATING</div><a href='"+url+"'><h4 class='card-title ml-3 mr-3 mt-2'>"+show.name+"</h4></a><h6 class='ml-3 font-weight-bold'>";
                
                
               for (var i=0;i<show.genre.length;i++){
                   if (i===0) {
                       html+="Genre - <span class='font-weight-normal'>";
                       html+= show.genre[i]+" ";
                   }

                   else {
                       html+= show.genre[i]+" ";
                   }
                   if (i!== show.genre.length-1)
                       html+="- "
               }
              html+="</span></h6><h6 class='mt-2 mb-2 ml-3 font-weight-bold medium-font'>Release Year - <span class='font-weight-normal'>"+show.year.split("-")[0]+"</span> </h6></div>";
                
                $("#main").append(html);
      });
    
    
    });

});
});