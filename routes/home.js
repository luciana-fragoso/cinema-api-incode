const router = require('express').Router();
const homeController = require ('../controller/home');
const validateUser = require('../validator/userValidator');
router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);


router.post('/signup',validateUser.validate,homeController.signup_post);


module.exports = router;