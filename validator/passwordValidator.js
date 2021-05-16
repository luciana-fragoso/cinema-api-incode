

var passwordValidator = require('password-validator');


var schema = new passwordValidator();
 schema
.is().min(8)                                    // Minimum length 8
.is().max(30)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits                  
.has().not().spaces()                           // Should not have spaces


module.exports = {schema}


