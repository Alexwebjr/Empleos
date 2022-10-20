const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//:::::::::: ROUTE :::::::::: //
router.use(authController.protect);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.use(authController.restrictTo('Admin')); //only for admin
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleUser);

module.exports = router;
