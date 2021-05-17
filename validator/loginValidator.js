exports.validate = [
    (req, res, next) => {
        var message = [];
        const login = req.body;

        if (!checkEmpty(login)){
            message.push("Both fields are required");
        }

        if (!checkEmail(login.email)){
           message.push("Invalid e-mail format");
        }


        if (message.length>0)
        res.render("pages/login",{message:message,type:"error"});
    else 
      next();

  


    }


]


checkEmpty = function(login){
    if(login.email === null || login.email === "")
      return false;
    if(login.password === null || login.password === "")
      return false;
    return true;
  }

  
checkEmail = function(email){
    if(!email || /^\s*$/.test(email))
      return true;
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
  }