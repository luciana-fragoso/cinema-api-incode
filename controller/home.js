

exports.homepage = function(req,res) {
    res.render("pages/index");
}

exports.login = function(req,res) {
    res.render("pages/login");
}

exports.signup = function(req,res) {
    res.render("pages/signup");
}