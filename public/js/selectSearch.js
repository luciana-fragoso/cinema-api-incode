$( document ).ready(function() {

    $('#select-id').on('change', function(e) {
        
       
        
        var searchResults = [];
        e.preventDefault();
        var genre = this.value;
        //var genre ="Comedy";

        var url = "http://api.tvmaze.com/shows";

     
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

                response.forEach(function(show,index){
                    if ((show.genres).includes(genre)){
                        showObj = {};
                        showObj.id = show.id;
                        showObj.name = show.name;
                        showObj.genre = show.genres;
                        showObj.image = show.image.medium;
                        showObj.year = show.premiered;
                        if (ids.includes(show.id)) {
                            showObj.average = parseFloat(avgs[ids.indexOf(show.id)]).toFixed(1);
                        }
                        else
                            showObj.average = null
                        
                      
                        searchResults.push(showObj);
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

      

           
    });
});
});