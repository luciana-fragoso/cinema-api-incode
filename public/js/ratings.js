

    function setRatings(rate,user,show){

        
       
        rating = {user_id:user,show_id: show,value:rate};

        $.ajax({
            method: "post",
            url: "../newRating",
            datatype: 'json',
            data: rating
            }).done(function(response) {
                response[0].find(function(show){
                    let averageFormat = parseFloat(show.average).toFixed(1)
                    $("#current_rating").text(averageFormat);
                    $("[data-toggle=popover]").popover("hide");
                    $("#ratings-stars").html("<p class='mt-2'>You have already rated this show</p><p class='font-weight-bold text-center'> You gave it "+ averageFormat +" stars</p>");
                });
               
            });
        }
   
  
    