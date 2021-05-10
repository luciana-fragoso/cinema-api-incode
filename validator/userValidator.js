
const password_validator = require('../validator/passwordValidator');

exports.validate = [
  (req, res, next) => {
    var message = [];
    const user = req.body;
    
    if (!checkEmpty(user)){
      message.push("All fields are required");
    }
    
    if (!checkSpecialChar(user.name)){
      message.push("Invalid name format");
    }

    if (!checkEmail(user.email)){
      message.push("Invalid e-mail format");
    }
   
    if (!checkEmptyPassword(user.password) && !checkEmptyPassword(user.confirm)){
      if (user.password !== user.confirm){
        message.push("Passwords don't match");
      }
      else if (user.password === user.confirm){
        if(!password_validator.schema.validate(user.password))
          message.push("Password rules missing "+password_validator.schema.validate(user.password, { list: true }));
       }
    }
    
if (message.length>0)
      res.render("pages/signup",{message:message,type:"error"});
    else 
      next();

  },
];


checkEmpty = function(user){
  if(user.email === null || user.email === "")
    return false;
  if(user.name === null || user.name === "")
    return false;
  if(user.password === null || user.password === "")
    return false;
  if(user.confirm === null || user.confirm === "")
    return false;
   
  return true;
}

checkSpecialChar = function(name){
  var regex = /^[a-zA-Z\s]*$/;
  return (regex.test(name));
}

checkEmail = function(email){
  if(!email || /^\s*$/.test(email))
    return true;
  return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
}

checkEmptyPassword = function(password){
  if (password === null || password === "")
      return true;
  
  return false;
}