const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

// 3) ROUTES

//router.get ('/',);
  
  
router.get('/',  viewController.getOverview);

router.get('/login', viewController.getLoginForm);

module.exports = router;