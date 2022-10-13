const Ad = require('../models/Ad'); //model

const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//CREATE
exports.createAd = crudHelper.createOne(Ad);

//READ
exports.getAllAds = crudHelper.getAll(Ad);
exports.getAd = crudHelper.getOne(Ad);

//UPDATE
exports.updateAd = crudHelper.updateOne(Ad);

//DELATE
exports.deleteAd = crudHelper.deleteOne(Ad);
