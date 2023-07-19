const Ad = require('../models/Ad'); //model
const User = require('../models/User');
const catchAsync = require('../helpers/catchAsync');
const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//CREATE
exports.createAd = crudHelper.createOne(Ad);

//READ
//exports.getAllAds = crudHelper.getAll(Ad);
//READ
exports.getAllAds = catchAsync(async (req, res, next) => {
  //filters...
  const docs = await Ad.findAll({ include: User });

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getAd = crudHelper.getOne(Ad);

//UPDATE
exports.updateAd = crudHelper.updateOne(Ad);

//DELATE
exports.deleteAd = crudHelper.deleteOne(Ad);
