const User = require("../model/user");


exports.homepage = (req, res) => {
    res.render("pages/index");
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

    