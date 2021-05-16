const axios = require('axios').default;
const Rating = require("../model/rating");
const sequelize = require("../util/database");


module.exports.seeShow = async function(req,res){
    
    const user_session_id = 1;


    const show_id = req.params.id;
    
    const show_api =  await axios.get('http://api.tvmaze.com/shows/'+show_id);
    const cast_api = await axios.get('http://api.tvmaze.com/shows/'+show_id+'/cast');
    const rating = await sequelize.query("select show_id as show_id, avg(value) as average from Ratings where show_id = "+show_id);
    const userRating = await sequelize.query("select value from Ratings where user_id = " + user_session_id + " and show_id = "+show_id);
    var user_rating = -1;
    var hasRated = false;
    var show_rating = "";
    rating[0].find(function(show){
        if (parseInt(show.show_id) === parseInt(show_id)) {
            show_rating = parseFloat(show.average).toFixed(1);
        }
    
    });

    if (userRating[0].length > 0 ){
        userRating[0].find(function(rating){  
            user_rating = parseFloat(rating.value).toFixed(1);
            hasRated = true;
    });
}
 
    var cast = [];
    
    for (var i=0;i<cast_api.data.length;i++){
        cast.push(cast_api.data[i].person.name);
    }
    
    
    const show_info = {
        id:show_id,
        name:show_api.data.name,
        genres:show_api.data.genres,
        year:show_api.data.premiered,
        summary:show_api.data.summary,
        image:show_api.data.image.medium,
        cast:cast,
        rating: show_rating,
        hasRated : hasRated,
        user_rating : user_rating
        
    }

    
     res.render("pages/show_page",{show:show_info});
   
}

module.exports.getRatings =  async function(req,res){    
 
    let result = await sequelize.query("select show_id as show_id ,avg(value) as average from Ratings group by (show_id)"); 
  
    res.send(result);
  
}


module.exports.getRatingsIndex =  async function(req,res){    
 
    let result = await sequelize.query("select show_id  as show_id ,avg(value) as average from Ratings group by (show_id)"); 
  
    return result;
  
}

module.exports.newRatint = async function(req,res){
   await Rating.create(req.body);

   const result = await sequelize.query("select show_id as show_id, avg(value) as average from Ratings where show_id = "+req.body.show_id);

   return res.send(result);
}

