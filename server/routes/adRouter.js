const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

//:::::::::: ROUTE :::::::::: //

router.route('/').get(adController.getAllAds).post(adController.createAd);

router
  .route('/:id')
  .get(adController.getAd)
  .patch(adController.updateAd)
  .delete(adController.deleteAd);

module.exports = router;
