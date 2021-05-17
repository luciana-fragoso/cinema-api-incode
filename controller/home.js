const User = require("../model/user");

const jwt = require("jsonwebtoken");
const showController = require("../controller/show");
const axios = require('axios').default;
var bcrypt = require('bcryptjs');



exports.homepage = async (req, res) => {
    
    const shows_api =  await axios.get('http://api.tvmaze.com/shows');
    const average = await showController.getRatingsIndex();

 
    var shows_info = [];
    
    var ids = [];
    var avgs = [];
    
    average[0].find(function(show){
        ids.push(show.show_id);
        avgs.push(show.average);
    });

   
    for (var i=0;i<50;i++){
        let show = shows_api.data[i];
        let show_average = null;

        if (ids.includes(show.id)) {
                            
            show_average = parseFloat(avgs[ids.indexOf(show.id)]).toFixed(1);
           
        }
       
            shows_info.push({
                id:show.id,
                name: show.name,
                date: show.premiered,
                genre: show.genres ,
                image : show.image.medium,
                average : show_average
            });
    }
 
  

    res.render("pages/index",{shows_info:shows_info});
}

exports.login = (req, res) => {
    res.render("pages/login");
}

exports.signup = (req, res) => {
    res.render("pages/signup");
}

exports.signup_post = async (req, res) => {
   
    await User.create({
        email:req.body.email,
        name:req.body.name,
        password:bcrypt.hashSync(req.body.password,8)}
        );
        
    res.redirect("/");
}

exports.login_post = async (req,res,next) =>{

    var message = [];
    await User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (!user) {
            message.push("E-mail not found");
            res.render("pages/login",{message:message,type:"error"}); 
        } else {

            var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

            if (!passwordIsValid) {
                message.push("Wrong password");
                res.render("pages/login",{token: null,message:message,type:"error"});
                }
            else {
                req.session.user=user.id;
                res.redirect("/");
             
            }
        
  
       
    }
    });
};

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect("/");

}