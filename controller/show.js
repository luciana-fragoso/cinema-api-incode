const axios = require('axios').default;

module.exports.seeShow = async function(req,res){
   
    const show_api =  await axios.get('http://api.tvmaze.com/shows/'+req.params.id);
    console.log(show_api.data);
    const show_info = {
        name:show_api.data.name,
        genres:show_api.data.genres,
        year:show_api.data.premiered,
        summary:show_api.data.summary,
        image:show_api.data.image.medium
    }
     res.render("pages/show_page",{show:show_info});
   
}