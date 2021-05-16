require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const authTokens = {};

/*const generateAuthToken = () => {
    let token = jwt.sign({id:user.id},process.env.jwt_key,
        {
           expiresIn:"1h"
       
       })
       return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
      }); 
  }*/
  /*const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}*/

 module.exports ={

    generateAuthToken : () => {
        let token = jwt.sign({id:user.id},process.env.jwt_key,
            {
               expiresIn:"1h"
           
           })
           return res.cookie('token', token, {
            expires: new Date(Date.now() + expiration),
            secure: false, // set to true if your using https
            httpOnly: true,
          }); 
      },

    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        //const authHeader = req.headers.authorization
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
          return res.json({
            success: false,
            message: 'Unauthorised access'
          })
        } //unauthorized access
        else {
          jwt.verify(token, process.env.jwt_key, (err, user) => {
            if (err) {
              return res.json({
                success: false,
                message: 'Token is not valid'
              }) //invalid token
            }
            req.user = user
            next()
          })
        }
      },

     getHashedPassword: async (password,saltRounds=8) => {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(saltRounds);
    
            // Hash password
            return await bcrypt.hashSync(password, salt);
        } catch (error) {
            console.log(error);
        }
    
        // Return null if error
        return null;
    
  },
};
