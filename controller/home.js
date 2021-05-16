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

    /*
    User.findOne({
        where: { 
            email: req.body.email
        }
     })
    .then(user =>{
        console.log(user);
    let token = jwt.sign({id:user.id},''+process.env.jwt_key,
        {
           expiresIn:"1h"
       })
       //return done(null, false, req.flash('message', 'Login successful' ))
       return res.cookie('token', token, {
           secure: false, // set to true if your using https
           httpOnly: true,
         }).json({
           msg:'Login sucessful',
           token: token,
         }); 
      /* return res.status(200).send({
           msg:'Login sucessful',
           token: token
       });*/
       //res.redirect('/');});
    
       console.log("LOGIN  CODE MUST GO HERE");
       res.redirect("/");    
   
   
};

exports.logout = function(req,res){
    console.log("LOGOUT CODE MUST GO HERE");
    res.redirect("/");

}