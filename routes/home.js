const router = require('express').Router();
const homeController = require ('../controller/home');

router.get('/',homeController.homepage);
router.get('/login',homeController.login);
router.get('/signup',homeController.signup);
module.exports = router;