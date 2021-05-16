const router = require('express').Router();

const homeController = require ('../controller/home');
const showController = require ('../controller/show');
const validateUser = require('../validator/userValidator');

router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);

router.post('/signup', validateUser.validate,homeController.signup_post);
router.post('/login',homeController.login_post);


router.get('/shows/:id',showController.seeShow);

router.get('/ratings',showController.getRatings);
router.post('/newRating', showController.newRatint);

router.get('/logout',homeController.logout);
//ROUTE
module.exports = router;