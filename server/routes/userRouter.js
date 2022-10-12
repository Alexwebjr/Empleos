const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Import Controller

//:::::::::: ROUTE :::::::::: //
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;
