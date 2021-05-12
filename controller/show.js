const axios = require('axios').default;

module.exports.seeShow = async function(req,res){
   
    const show_api =  await axios.get('http://api.tvmaze.com/shows/'+req.params.id);
    const cast_api = await axios.get('http://api.tvmaze.com/shows/'+req.params.id+'/cast');
    var cast = [];
    
    for (var i=0;i<cast_api.data.length;i++){
        cast.push(cast_api.data[i].person.name);
    }
 
    const show_info = {
        name:show_api.data.name,
        genres:show_api.data.genres,
        year:show_api.data.premiered,
        summary:show_api.data.summary,
        image:show_api.data.image.medium,
        cast:cast
        
    }
     res.render("pages/show_page",{show:show_info});
   
}