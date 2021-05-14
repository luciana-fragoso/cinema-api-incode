const User = require("../model/user");
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secret = require('../config/server')

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

exports.login_post = async (req,res,next) =>{
    await User.findOne({
        where:
        {
        email:req.body.email
        }
     })
    .then(user =>{
        console.log(user);
        if(!user){
            return res.status(401).json({
                message:'Authorization failed'
            });
        }
        bcrypt.compare(req.body.password,user.password,function(err,result) {
            if(err){
             return res.status(401).json({
                 message:'Authorization failed'});
            }
           else if(result){
               let token = jwt.sign({id:user.id},process.env.jwt_key,
                 {
                    expiresIn:"1h"
                
                })
                return res.status(200).json({
                    message:'Login sucessful',
                    token: token
                });
                //res.redirect('/');
            }
            else
                res.status(401).json({
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