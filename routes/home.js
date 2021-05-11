const router = require('express').Router();
const homeController = require ('../controller/home');
const showController = require ('../controller/show');
const validateUser = require('../validator/userValidator');
router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);


router.post('/signup',validateUser.validate,homeController.signup_post);

router.get('/shows/:id',showController.seeShow);

module.exports = router;