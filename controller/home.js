const User = require("../model/user");
const axios = require('axios').default;
var bcrypt = require('bcryptjs');

exports.homepage = async (req, res) => {
    
    const shows_api =  await axios.get('http://api.tvmaze.com/shows?page=1');
    var shows_info = [];
   
    for (var key in shows_api.data) {
      shows_info.push({
          id:shows_api.data[key].id,
          name:shows_api.data[key].name,
          date:shows_api.data[key].premiered,
          genre:shows_api.data[key].genres,
          image:shows_api.data[key].image.medium
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

exports.login_post = (req,res,next) =>{
   User.findOne({
       email:req.body.email
    })
   .exec()
   .then(user =>{
       if(user.length<1){
           return res.status(401).json({
               message:'Authorization failed'
           });
       }
       bcrypt.compareSync(req.body.password,user[0].password,(err,result) =>{
           if(err){
            return res.status(401).json({
                message:'Authorization failed'});
           }
           if(result){
               console.log('login successful');
               return res.status(200).json({
                   message:'Login sucessful'
                   
               });
           }
           res.staus(401).json({
               message:'Authorization failed'
           });
       });    
   })
   .catch(err =>{
       console.log('error');
       res.status(500).json({
           error:err
       })

   })
}

