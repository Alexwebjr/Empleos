const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//:::::::::: ROUTE :::::::::: //
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleUser);

module.exports = router;