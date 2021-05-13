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
                let html = "<div class='mb-4 d-flex mx-auto search-div'><div class='mr-0'><a href='"+url+"'><img class='search-icon' src='"+show.image+"'alt='"+show.name+" icon'></a></div><div class='text-break search-info mr-0'><div class='title-div p-2'><a href='"+url+"'><h5 class='text-white'>"+show.name+"</h5></a></div><h6 class='mt-2 mb-0 font-weight-bold medium-font ml-3 mt-2 '>";
                
                
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
               html+="</span></h6><h6 class='mt-2 mb-0 ml-3 font-weight-bold medium-font'>Release Year - <span class='font-weight-normal'>"+show.year+"</span> </h6></div></div>";
             
                
                $("#main").append(html);
      });
    
    
    });

});
});