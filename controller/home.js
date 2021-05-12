const User = require("../model/user");
const axios = require('axios').default;

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
    await User.create(req.body);
    res.redirect("/");
}

