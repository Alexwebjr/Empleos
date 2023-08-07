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
exports.updateAd = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let doc = await Ad.findOne({ where: { id }, include: User });

  if (!doc) {
    return next(new AppError('Please provide a valid id', 400));
  }

  doc.set(req.body);
  const newDoc = await doc.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});

//DELATE
exports.deleteAd = crudHelper.deleteOne(Ad);
